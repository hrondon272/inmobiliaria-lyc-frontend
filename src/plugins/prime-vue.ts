/* eslint-disable vue/multi-word-component-names */
import PrimeVue from "primevue/config";

//Components
import { ES } from "@/lang/prime-vue";
import InputText from "primevue/inputtext";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmDialog from "primevue/confirmdialog";
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Aura from '@primevue/themes/aura';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';
import Carousel from 'primevue/carousel';
import Image from 'primevue/image';
import Select from 'primevue/select';
import Card from 'primevue/card';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/column';
import MultiSelect from 'primevue/column';
import Tag from 'primevue/column';
import ColorPicker from 'primevue/colorpicker';
import Paginator from 'primevue/paginator';
import Galleria from 'primevue/galleria';
import Message from 'primevue/message';


const prime_vue_register = (app: any) => {
    app.use(PrimeVue, {
        locale: ES,
        theme: { preset: Aura }
    });
    app.component("InputText", InputText);
    app.component("ConfirmPopup", ConfirmPopup);
    app.component("ConfirmDialog", ConfirmDialog);
    app.component("MenuBar", Menubar);
    app.component("ButtonPrime", Button);
    app.component("Divider", Divider);
    app.component("DialogPrime", Dialog);
    app.component("Password", Password);
    app.component("FloatLabel", FloatLabel);
    app.component("Carousel", Carousel);
    app.component("ImagePrime", Image);
    app.component("SelectPrime", Select);
    app.component("Card", Card);
    app.component("InputNumber", InputNumber);
    app.component("CheckboxPrime", Checkbox);
    app.component("FileUpload", FileUpload);
    app.component("TextareaPrime", Textarea);
    app.directive('tooltip', Tooltip);
    app.component('ProgressSpinner', ProgressSpinner);
    app.component('ToastPrime', Toast);
    app.component('Tabs', Tabs);
    app.component('TabList', TabList);
    app.component('Tab', Tab);
    app.component('TabPanels', TabPanels);
    app.component('TabPanel', TabPanel);
    app.component('DataTable', DataTable);
    app.component('Column', Column);
    app.component('InputIcon', InputIcon);
    app.component('IconField', IconField);
    app.component('MultiSelect', MultiSelect);
    app.component('Tag', Tag);
    app.component('ColorPicker', ColorPicker);
    app.component('Paginator', Paginator);Galleria
    app.component('Galleria', Galleria);
    app.component('Message', Message);
};

const install = (app: any) => {
    prime_vue_register(app);
};

export default install;

