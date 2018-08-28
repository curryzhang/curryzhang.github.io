import Vue from 'vue';

import RtGrid from '../packages/grid/main';
import MlHeader from '../packages/header/main';
import MlToolbar from '../packages/toolbar/main';
import MlContent from '../packages/content/main';
import MlSection from '../packages/section/main';


const components = [
    RtGrid,
    MlHeader,
    MlToolbar,
    MlContent,
    MlSection,
];

export default {
    install: function (Vue, opts) {

        components.map(function (component) {
            Vue.component(component.name, component);
        });
    }
}