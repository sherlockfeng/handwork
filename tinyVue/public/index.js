import {reactive, computed, watch, Watcher} from '../src/index';

const data = reactive({
    name: 'hello word',
    number: 1
});

const numberPlusOne = computed(() => data.number + 1);

new Watcher(() => {
    document.getElementById('app').innerHTML = `
        <p>请在控制台输入data，分别改变data.name尝试效果</p>
        <p>data.name被watch了，可以打印出新旧值的变化</p>
        name is  <br>
        <p>请在控制台改变data.number尝试computed效果</p>
        <p>data.number现在是</p>
    computed: 1 + number 是 ${numberPlusOne.value}
            <p>当前data的状态是：</p>
    `;
});

// watch(
//     () => data.name,
//     (newV, oldV) => {
//         console.log(`旧的name是${oldV}`);
//         console.log(`新的name是${newV}`);
//     }
// );

window.data = data;
