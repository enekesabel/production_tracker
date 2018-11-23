import Vue from 'vue';
import Vuex, {ActionTree, MutationTree} from 'vuex';
import {IRootState} from '@/store/IRootState';
import {Machine} from '@/types/Machine';
import {RootMutation} from '@/store/RootMutation';
import axios from 'axios';

Vue.use(Vuex);

const state: IRootState = {
  machines: [],
};

const actions: ActionTree<IRootState, IRootState> = {
  async fetchMachines({commit}) {
    const response = await axios.get('machines');
    commit(RootMutation.SET_MACHINES, response.data);
  },
  async createMachine({commit}, machine: Machine) {
    const response = await axios.post('machines', machine);
    commit(RootMutation.ADD_MACHINE, machine);
  },
  async deleteMachine({commit}, machineId: string) {
    const response = await axios.delete(`machines/${machineId}`);
    commit(RootMutation.REMOVE_MACHINE, machineId);
  },
};

const mutations: MutationTree<IRootState> = {
  [RootMutation.SET_MACHINES](state, machines: Machine[]) {
    state.machines = machines;
  },
  [RootMutation.ADD_MACHINE](state, machine: Machine) {
    if (!state.machines.find(m => machine.MachineId === m.MachineId)) {
      state.machines.push(machine);
    }
  },
  [RootMutation.REMOVE_MACHINE](state, machineId: string) {
    const index = state.machines.findIndex(m => m.MachineId === machineId);
    if (index !== -1) {
      state.machines.splice(index, 1);
    }
  },
};

export default new Vuex.Store<IRootState>({
  state,
  mutations,
  actions,
});
