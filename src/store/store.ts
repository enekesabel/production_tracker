import Vue from 'vue';
import Vuex, {ActionTree, GetterTree, MutationTree} from 'vuex';
import {IRootState} from '@/store/IRootState';
import {Machine} from '@/types/Machine';
import {RootMutation} from '@/store/RootMutation';
import {User} from '@/types/User';
import {MachineApi} from '@/api/MachineApi';
import {UserApi} from '@/api/UserApi';

Vue.use(Vuex);

const state: IRootState = {
  machines: [],
  users: [],
};

const getters: GetterTree<IRootState, IRootState> = {
  getMachineById: state => (machineId: string) => state.machines.find(m => m.id === machineId),
};

const actions: ActionTree<IRootState, IRootState> = {
  async fetchMachines({commit}) {
    const machines = await MachineApi.getMachines();
    commit(RootMutation.SET_MACHINES, machines);
  },
  async fetchMachine({commit}, id: string) {
    const machine = await MachineApi.getMachine(id);
    commit(RootMutation.SET_MACHINE, machine);
  },
  async createMachine({commit}, machine: Machine) {
    const createdMachine = await MachineApi.createMachine(machine);
    commit(RootMutation.ADD_MACHINE, createdMachine);
  },
  async updateMachine({commit}, machine: Machine) {
    const updatedMachine = await MachineApi.updateMachine(machine);
    commit(RootMutation.SET_MACHINE, updatedMachine);
  },
  async deleteMachine({commit}, id: string) {
    await MachineApi.deleteMachine(id);
    commit(RootMutation.REMOVE_MACHINE, id);
  },
  async fetchUsers({commit}) {
    const users = await UserApi.getUsers();
    commit(RootMutation.SET_USERS, users);
  },
};

const mutations: MutationTree<IRootState> = {
  [RootMutation.SET_MACHINES](state, machines: Machine[]) {
    state.machines = machines;
  },
  [RootMutation.SET_MACHINE](state, machine: Machine) {
    const index = state.machines.findIndex(m => m.id === machine.id);
    if (index === -1) {
      state.machines.push(machine);
    }
    state.machines.splice(index, 1, machine);
  },
  [RootMutation.ADD_MACHINE](state, machine: Machine) {
    if (!state.machines.find(m => machine.id === m.id)) {
      state.machines.push(machine);
    }
  },
  [RootMutation.REMOVE_MACHINE](state, id: string) {
    const index = state.machines.findIndex(m => m.id === id);
    if (index !== -1) {
      state.machines.splice(index, 1);
    }
  },
  [RootMutation.SET_USERS](state, users: User[]) {
    state.users = users;
  },
};

export default new Vuex.Store<IRootState>({
  state,
  getters,
  actions,
  mutations,
});
