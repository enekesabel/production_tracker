import {Component, Model, Prop, Vue, Watch} from 'vue-property-decorator';
import {Machine} from '@/types/Machine';
import {ElForm} from 'element-ui/types/form';

@Component
export default class MachineSettingsForm extends Vue {

  @Model('update:machine')
  @Prop({
    required: true,
  })
  private machine: Machine;

  private localMachine: Machine = {
    id: '',
    machineId: '',
    machineName: '',
  };

  private rules = {
    machineId: [
      {required: true, message: 'Please provide a name', trigger: 'blur'},
    ],
    machineName: [
      {required: true, message: 'Please provide an id', trigger: 'blur'},
    ],
  };

  async validate() {
    await (this.$refs.form as ElForm).validate();
  }

  @Watch('machine', {immediate: true})
  onMachineChange(machine: Machine) {
    if (machine !== this.localMachine) {
      this.localMachine = machine;
    }
  }

  @Watch('localMachine', {deep: true})
  onLocalMachineChange(localMachine: Machine) {
    if (localMachine !== this.machine) {
      this.$emit('update:machine', localMachine);
    }
  }

}
