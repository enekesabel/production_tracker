import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {MachineInput} from '@/types/MachineInput';
import MachineInputEditorDialog from '@/components/machine_input_editor/MachineInputEditorDialog';
import {GPIOPin} from '@/enums/GPIOPin';
import {MachineInputApi} from '@/api/MachineInputApi';
import {InputType} from '@/enums/InputType';

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

  InputType = InputType;

  get parsedInputs(): any[] {
    return this.inputs.map((i) => {
      return {...i, inputType: InputType[i.inputType]};
    });
  }

  get showAddButton(): boolean {
    return this.inputs.length < 16;
  }

  get usedPins(): GPIOPin[] {
    return this.inputs.map(i => i.gpioPin);
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
      return i.id && (oldVersion.gpioPin !== i.gpioPin || oldVersion.name !== i.name);
    });
  }

  editInput(input: MachineInput) {
    this.inputEditorMode = InputEditorMode.EDIT;
    this.selectedInput = input;
    this.openMachineInputEditorDialog();
  }

  addInput() {
    const machineInputEditorDialog = this.$refs.machineInputEditorDialog as MachineInputEditorDialog;
    this.inputEditorMode = InputEditorMode.ADD;
    this.selectedInput = {
      gpioPin: null,
      id: null,
      machineId: this.machineId,
      name: '',
      inputType: null,
    };

    this.openMachineInputEditorDialog();
  }

  removeInput(input: MachineInput) {
    const index = this.inputs.indexOf(input);
    if (index === -1) {
      return;
    }
    this.inputs.splice(index, 1);
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
    await Promise.all(this.removedInputs.map((i) => {
      return MachineInputApi.deleteMachineInput(i.id);
    }));

    let promises: Promise<any>[] = this.addedInputs.map((i) => {
      return MachineInputApi.createMachineInput(i);
    });
    promises = [...promises, ...this.modifiedInputs.map((i) => {
      return MachineInputApi.updateMachineInput(i);
    })];

    await Promise.all(promises);
  }

  @Watch('machineId', {immediate: true})
  onMachinedChange(machineId: string) {
    if (!machineId) {
      return;
    }
    this.fetchInputs(machineId);
  }

}

const enum InputEditorMode {
  ADD,
  EDIT,
}
