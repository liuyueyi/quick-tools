import Vue from 'vue';
import nyaCheckbox from './nya-checkbox.vue';
import nyaInput from './nya-input.vue';
import nyaContainer from './nya-container.vue';
import nyaSelect from './nya-select';
import nyaLoading from './nya-loading.vue';
import nyaRadio from './nya-radio/nya-radio.vue';
import nyaRadioGroup from './nya-radio/nya-radio-group.vue';
import nyaCopy from './nya-copy.vue';
import nyaCircle from './nya-circle.vue';
import nyaPanel from './nya-panel.vue';
import nyaIcon from './nya-icon.vue';
import nyaReadonlyInput from './nya-readonly-input.vue';

export default () => {
    Vue.component('nya-copy', nyaCopy);
    Vue.component('nya-checkbox', nyaCheckbox);
    Vue.component('nya-input', nyaInput);
    Vue.component('nya-container', nyaContainer);
    Vue.component('nya-select', nyaSelect);
    Vue.component('nya-loading', nyaLoading);
    Vue.component('nya-radio', nyaRadio);
    Vue.component('nya-radio-group', nyaRadioGroup);
    Vue.component('nya-circle', nyaCircle);
    Vue.component('nya-panel', nyaPanel);
    Vue.component('nya-icon', nyaIcon);
    Vue.component('nya-readonly-input', nyaReadonlyInput);
};
