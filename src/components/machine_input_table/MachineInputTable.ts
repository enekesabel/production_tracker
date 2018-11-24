import {Component, Prop, Vue} from 'vue-property-decorator';
import {MachineInput} from '@/types/MachineInput';
import MachineInputEditorDialog from '@/components/machine_input_editor/MachineInputEditorDialog';
import {GPIOPin} from '@/enums/GPIOPin';
import {MachineInputApi} from '@/api/MachineInputApi';

@Component({
  components: {MachineInputEditorDialog},
})
export default class MachineInputTable extends Vue {

  @Prop({
    type: String,
    required: true,
  })
  private machineId: string;

  private inputs: MachineInput[] = [];
  private oldInputs: MachineInput[] = [];
  private selectedInput: MachineInput = null;
  private inputEditorMode: InputEditorMode = InputEditorMode.ADD;

  get usedPins(): GPIOPin[] {
    return this.inputs.map(i => i.gPIOPin);
  }

  get inputDialogTitle(): string {
    return this.inputEditorMode === InputEditorMode.ADD ? 'Add input' : 'Edit input';
  }

  get availablePins(): GPIOPin[] {
    const keys = Object.keys(GPIOPin).filter(k => typeof GPIOPin[k as any] === 'number');
    return keys.map(k => GPIOPin[k as any] as any as GPIOPin).filter((p) => {
      return this.usedPins.indexOf(p) === -1;
    });
  }

  get removedInputs(): MachineInput[] {
    return this.oldInputs.filter(o => !this.inputs.find((i => i.id === o.id)));
  }

  get addedInputs(): MachineInput[] {
    return this.inputs.filter(i => !i.id);
  }

  get modifiedInputs(): MachineInput[] {
    return this.inputs.filter((i) => {
      const oldVersion = this.oldInputs.find(o => o.id === i.id);
      return i.id && (oldVersion.gPIOPin !== i.gPIOPin || oldVersion.name !== i.name);
    });
  }

  editInput(input: MachineInput) {
    this.inputEditorMode = InputEditorMode.EDIT;
    this.selectedInput = input;
    this.openMachineInputEditorDialog();
  }

  async addInput() {
    const machineInputEditorDialog = this.$refs.machineInputEditorDialog as MachineInputEditorDialog;
    this.inputEditorMode = InputEditorMode.ADD;
    this.selectedInput = {
      gPIOPin: null,
      id: null,
      machineId: this.machineId,
      name: '',
    };

    this.openMachineInputEditorDialog();
  }

  openMachineInputEditorDialog() {
    const machineInputEditorDialog = this.$refs.machineInputEditorDialog as MachineInputEditorDialog;
    machineInputEditorDialog.open();
  }

  onInputUpdated(input: MachineInput) {
    if (this.inputEditorMode === InputEditorMode.ADD) {
      this.inputs.push(input);
    }
  }

  async fetchInputs(machineId: string) {
    this.inputs = await MachineInputApi.getInputsOfMachine(machineId);
    this.oldInputs = [...this.inputs];
  }

  async save() {
    let promises: Promise<any>[] = this.addedInputs.map((i) => {
      return MachineInputApi.createMachineInput(i);
    });
    promises = [...promises, ...this.modifiedInputs.map((i) => {
      return MachineInputApi.updateMachineInput(i);
    })];
    promises = [...promises, ...this.removedInputs.map((i) => {
      return MachineInputApi.deleteMachineInput(i.id);
    })];

    await Promise.all(promises);
  }

}

const enum InputEditorMode {
  ADD,
  EDIT,
}
