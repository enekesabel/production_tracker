import Vue from 'vue';
import Vuex, {ActionTree, MutationTree} from 'vuex';
import {IRootState} from '@/store/IRootState';
import {Machine} from '@/types/Machine';
import {RootMutation} from '@/store/RootMutation';
import axios from 'axios';
import {User} from '@/types/User';
import {MachineApi} from '@/api/MachineApi';

Vue.use(Vuex);

const state: IRootState = {
  machines: [],
  users: [],
};

const actions: ActionTree<IRootState, IRootState> = {
  async fetchMachines({commit}) {
    const machines = await MachineApi.getMachines();
    commit(RootMutation.SET_MACHINES, machines);
  },
  async createMachine({commit}, machine: Machine) {
    const createdMachine = await MachineApi.createMachine(machine);
    commit(RootMutation.ADD_MACHINE, createdMachine);
  },
  async deleteMachine({commit}, id: string) {
    await MachineApi.deleteMachine(id);
    commit(RootMutation.REMOVE_MACHINE, id);
  },
  async fetchUsers({commit}) {
    const response = await axios.get('users');
    commit(RootMutation.SET_USERS, response.data);
  },
};

const mutations: MutationTree<IRootState> = {
  [RootMutation.SET_MACHINES](state, machines: Machine[]) {
    state.machines = machines;
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
  mutations,
  actions,
});
