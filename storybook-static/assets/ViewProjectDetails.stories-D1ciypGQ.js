import{a as e,n as t}from"./chunk-BneVvdWh.js";import{O as n}from"./iframe-DwfviQp3.js";import{t as r}from"./jsx-runtime-D16BNjX-.js";import{n as i,t as a}from"./utils-CZ3R2CgF.js";import{n as o,t as s}from"./InputField-DyWGIrIe.js";import{n as c,t as l}from"./404-DWS3ThcT.js";import{a as u,c as d,d as f,g as p,h as m,i as h,l as g,m as _,n as v,o as y,p as b,r as x,s as S,t as C,u as w}from"./UpandDown-D_dsvhGx.js";import{a as T,i as E,n as D,o as O,r as k,s as A,t as j}from"./SelectField-CB9jLj9W.js";function M(){let e=w(e=>e.projects),t=w(e=>e.initializeProjects);(0,N.useEffect)(()=>{t(h(localStorage.getItem(`project`)))},[t]);let{projectId:n}=p(),r=e.find(e=>e.id===Number(n));return r?(0,P.jsxs)(`div`,{className:`flex w-245  `,children:[(0,P.jsxs)(`h1`,{className:`text-5xl underline font-bold`,children:[r.textProject,` :`]}),(0,P.jsx)(`div`,{})]}):(0,P.jsx)(`div`,{children:`Project not found`})}var N,P,F=t((()=>{N=e(n(),1),f(),x(),g(),P=r(),M.__docgenInfo={description:``,methods:[],displayName:`ProjectDetailCard`}}));function I({className:e,...t}){return(0,L.jsx)(O,{"data-slot":`checkbox`,className:a(`peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary`,e),...t,children:(0,L.jsx)(A,{"data-slot":`checkbox-indicator`,className:`grid place-content-center text-current transition-none [&>svg]:size-3.5`,children:(0,L.jsx)(E,{})})})}var L,R=t((()=>{n(),k(),T(),i(),L=r(),I.__docgenInfo={description:``,methods:[],displayName:`Checkbox`}})),z,B,V,H=t((()=>{z=e(n(),1),F(),o(),f(),R(),d(),y(),D(),x(),v(),g(),c(),B=r(),V=()=>{let e=w(e=>e.projects),t=w(e=>e.tasks),n=w(e=>e.initializeProjects),r=w(e=>e.initializeTasks),i=w(e=>e.addTask),a=w(e=>e.deleteTask),o=w(e=>e.toggleTaskCompletion),{projectId:c}=p(),d=Number(c),f=c!==void 0&&Number.isFinite(d),[m,g]=(0,z.useState)(``),[_,v]=(0,z.useState)(``),[y,b]=(0,z.useState)(``),[x,T]=(0,z.useState)(``),[E,D]=(0,z.useState)(``),[O,k]=(0,z.useState)(`none`),[A,N]=(0,z.useState)(`none`),[P,F]=(0,z.useState)(`none`);(0,z.useEffect)(()=>{let e=h(localStorage.getItem(`project`));n(e),r(e.flatMap(e=>e.extendedTasks))},[n,r]);let L=e=>{let n=t.filter(t=>t.projectId===e.id);return e.completed||n.length>0&&n.every(e=>e.isCompleted)};(0,z.useEffect)(()=>{let n=e.map(e=>({...e,completed:L(e),extendedTasks:t.filter(t=>t.projectId===e.id)}));localStorage.setItem(`project`,JSON.stringify(n))},[e,t]);let R=(e,t)=>{let n=e.trim(),r=t.trim();if(!n){window.alert(`Please enter a task.`);return}if(!r){window.alert(`Please select an importance level.`);return}i({taskId:Date.now(),textTask:n,projectId:d,isCompleted:!1,taskImportance:r}),g(``),v(``),T(``),D(``),b(``)},V=()=>{N(`none`),F(`none`),k(e=>e===`high-to-low`?`low-to-high`:`high-to-low`)},H=()=>{k(`none`),F(`none`),N(e=>e===`a-to-z`?`z-to-a`:`a-to-z`)},U=()=>{k(`none`),N(`none`),F(e=>e===`completed-to-incomplete`?`incomplete-to-completed`:`completed-to-incomplete`)},W=e=>{a(e)},G=e=>{o(e)},K=t.filter(e=>e.projectId===d),q=K.filter(e=>e.isCompleted).length,J=K.length,Y=J===0?0:Math.round(q/J*100),X=e=>{D(e.trim()),T(``)},Z=e=>{b(e)},Q={low:1,medium:2,high:3},$=K;E&&($=$.filter(e=>e.textTask.toLowerCase().includes(E.toLowerCase()))),y&&y!==`All`&&($=$.filter(e=>e.taskImportance.toLowerCase()===y.toLowerCase())),O===`high-to-low`&&($=[...$].sort((e,t)=>(Q[t.taskImportance]??0)-(Q[e.taskImportance]??0))),O===`low-to-high`&&($=[...$].sort((e,t)=>(Q[e.taskImportance]??0)-(Q[t.taskImportance]??0))),A===`a-to-z`&&($=[...$].sort((e,t)=>e.textTask.localeCompare(t.textTask))),A===`z-to-a`&&($=[...$].sort((e,t)=>t.textTask.localeCompare(e.textTask))),P===`completed-to-incomplete`&&($=[...$].sort((e,t)=>Number(t.isCompleted)-Number(e.isCompleted))),P===`incomplete-to-completed`&&($=[...$].sort((e,t)=>Number(e.isCompleted)-Number(t.isCompleted)));let ee=e.some(e=>e.id===d);return!f||!ee?(0,B.jsx)(l,{}):(0,B.jsxs)(`div`,{className:`w-full max-w-6xl pt-7 ml-auto mr-auto`,children:[(0,B.jsxs)(`div`,{className:`grid grid-cols-1 gap-1 pb-10 md:ml-auto md:w-1/2 pl-29`,children:[(0,B.jsx)(`h3`,{className:`text-1xl font-bold`,children:`Search Tasks:`}),(0,B.jsxs)(`div`,{className:`flex gap-3 w-full`,children:[(0,B.jsx)(s,{placeholder:`search`,value:x,onChange:e=>T(e.target.value)}),(0,B.jsx)(u,{className:`w-30 h-8 border border-black/20 transition-transform duration-300 hover:scale-110 mt-1`,onClick:()=>X(x),children:`Search`})]})]}),(0,B.jsx)(`div`,{className:`flex items-center justify-center pb-10`,children:(0,B.jsxs)(S,{className:`w-60 h-50 items-center justify-center gap-2`,children:[(0,B.jsx)(`h1`,{className:`text-2xl text-center font-bold underline`,children:`Tasks Completed`}),(0,B.jsxs)(`p`,{className:`text-2xl font-bold`,children:[q,`/`,J]}),Y>0&&(0,B.jsx)(`div`,{className:`w-1/2 bg-red-400 rounded-full h-4 mb-4`,children:(0,B.jsxs)(`div`,{className:`bg-green-400 h-4 rounded-full items-center flex justify-center `,style:{width:`${Y}%`},children:[Y,`%`]})}),Y===100&&(0,B.jsx)(`h3`,{className:`text-green-500 font-bold `,children:`Good job!`})]})}),(0,B.jsxs)(`div`,{className:`flex list-none border-4 rounded-sm p-2 bg-gray-50  h-20 justify-between items-center `,children:[(0,B.jsx)(M,{}),(0,B.jsx)(`div`,{className:`grid grid-cols-1 items-end`,children:q===J&&J>0?(0,B.jsx)(`h3`,{className:`text-green-500 font-bold w-50 pl-2`,children:`Completed`}):(0,B.jsx)(`h3`,{className:`text-red-500 font-bold w-50 pl-2`,children:`In Progress`})})]}),(0,B.jsx)(`div`,{className:`pt-10`}),(0,B.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4`,children:[(0,B.jsx)(`h1`,{className:`text-1xl font-bold`,children:`Add Task:`}),(0,B.jsx)(s,{placeholder:`Task Name`,value:m,onChange:e=>{g(e.target.value)}}),(0,B.jsx)(j,{placeholder:`Importance`,value:_,onChange:v}),(0,B.jsx)(u,{onClick:()=>R(m,_),type:`button`,className:`w-30 h-8 border border-black transition-transform duration-300 hover:scale-110`,children:`Add Task`}),(0,B.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2 md:ml-auto`,children:[(0,B.jsx)(`h1`,{className:`text-1xl font-bold`,children:`Filter by importance:`}),[`All`,`High`,`Medium`,`Low`].map(e=>(0,B.jsx)(u,{variant:y===e||e===`All`&&!y?`default`:`outline`,onClick:()=>Z(e),className:` hover:bg-gray-200 hover:scale-102`,children:e},e))]})]}),(0,B.jsx)(`br`,{}),(0,B.jsxs)(`div`,{className:`grid grid-cols-1 rounded-sm border-2 w-full overflow-hidden`,children:[(0,B.jsxs)(`div`,{className:`grid grid-cols-[minmax(0,1.4fr)_minmax(120px,.6fr)_minmax(120px,.6fr)_minmax(140px,.5fr)] items-stretch gap-0 border-b bg-gray-100`,children:[(0,B.jsx)(`div`,{className:`px-4 py-3 border-r flex items-center`,children:(0,B.jsxs)(`h1`,{className:`text-2xl font-bold underline cursor-pointer`,onClick:H,children:[`Tasks`,(0,B.jsx)(`img`,{src:C,alt:`Sort Arrow`,className:`w-4 inline-block ml-2`})]})}),(0,B.jsx)(`div`,{className:`px-4 py-3 border-r flex items-center`,children:(0,B.jsxs)(`h1`,{className:`text-2xl font-bold underline cursor-pointer`,onClick:V,children:[`Importance`,(0,B.jsx)(`img`,{src:C,alt:`Sort Arrow`,className:`w-4 inline-block ml-2`})]})}),(0,B.jsx)(`div`,{className:`px-4 py-3 border-r flex items-center`,children:(0,B.jsxs)(`h1`,{className:`text-2xl font-bold underline cursor-pointer`,onClick:U,children:[`Status`,(0,B.jsx)(`img`,{src:C,alt:`Sort Arrow`,className:`w-4 inline-block ml-2`})]})}),(0,B.jsx)(`div`,{className:`px-4 py-3 flex items-center`,children:(0,B.jsx)(`h1`,{className:`text-2xl font-bold underline`,children:`Delete`})})]}),$.map(e=>(0,B.jsxs)(`li`,{className:`grid list-none grid-cols-[minmax(0,1.4fr)_minmax(120px,.6fr)_minmax(120px,.6fr)_minmax(140px,.5fr)] items-stretch gap-0 border-b bg-gray-50 hover:font-bold`,children:[(0,B.jsx)(`div`,{className:`px-4 py-3 border-r flex items-center`,children:(0,B.jsx)(`span`,{className:`min-w-0 text-xl`,children:e.textTask})}),(0,B.jsx)(`div`,{className:`px-4 py-3 border-r flex items-center`,children:(0,B.jsx)(`span`,{className:`text-xl capitalize`,children:e.taskImportance})}),(0,B.jsx)(`div`,{className:`px-4 py-3 border-r flex items-center`,children:(0,B.jsx)(I,{className:`bg-white h-5 w-5 text-green-800 border-black hover:scale-105`,onClick:()=>G(e.taskId),checked:e.isCompleted})}),(0,B.jsx)(`div`,{className:`px-4 py-3 flex items-center`,children:(0,B.jsx)(`button`,{onClick:()=>W(e.taskId),className:`text-red-500 w-20 h-8 border rounded-sm transform transition duration-300 hover:scale-110`,children:`Delete`})})]},e.taskId))]})]})},V.__docgenInfo={description:``,methods:[],displayName:`ViewProjectDetails`}})),U,W,G,K,q,J,Y;t((()=>{f(),g(),H(),U=r(),W={id:1,textProject:`Build landing page`,completed:!1,projectImportance:`high`,extendedTasks:[]},G={title:`Pages/ViewProjectDetails`,component:V,parameters:{layout:`fullscreen`},decorators:[e=>(0,U.jsx)(b,{initialEntries:[`/project/1`],children:(0,U.jsx)(m,{children:(0,U.jsx)(_,{path:`/project/:projectId`,element:(0,U.jsx)(e,{})})})})]},K={decorators:[e=>(w.setState({projects:[W],tasks:[]}),(0,U.jsx)(e,{}))]},q={decorators:[e=>(w.setState({projects:[W],tasks:[{taskId:1,projectId:1,textTask:`Design mockups`,taskImportance:`high`,isCompleted:!0},{taskId:2,projectId:1,textTask:`Set up routing`,taskImportance:`medium`,isCompleted:!1},{taskId:3,projectId:1,textTask:`Write tests`,taskImportance:`low`,isCompleted:!1},{taskId:4,projectId:1,textTask:`Deploy to staging`,taskImportance:`high`,isCompleted:!1}]}),(0,U.jsx)(e,{}))]},J={decorators:[e=>(w.setState({projects:[{...W,completed:!0}],tasks:[{taskId:1,projectId:1,textTask:`Design mockups`,taskImportance:`high`,isCompleted:!0},{taskId:2,projectId:1,textTask:`Set up routing`,taskImportance:`medium`,isCompleted:!0}]}),(0,U.jsx)(e,{}))]},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    useProjectAndTaskManage.setState({
      projects: [project],
      tasks: []
    });
    return <Story />;
  }]
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    useProjectAndTaskManage.setState({
      projects: [project],
      tasks: [{
        taskId: 1,
        projectId: 1,
        textTask: 'Design mockups',
        taskImportance: 'high',
        isCompleted: true
      }, {
        taskId: 2,
        projectId: 1,
        textTask: 'Set up routing',
        taskImportance: 'medium',
        isCompleted: false
      }, {
        taskId: 3,
        projectId: 1,
        textTask: 'Write tests',
        taskImportance: 'low',
        isCompleted: false
      }, {
        taskId: 4,
        projectId: 1,
        textTask: 'Deploy to staging',
        taskImportance: 'high',
        isCompleted: false
      }]
    });
    return <Story />;
  }]
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    useProjectAndTaskManage.setState({
      projects: [{
        ...project,
        completed: true
      }],
      tasks: [{
        taskId: 1,
        projectId: 1,
        textTask: 'Design mockups',
        taskImportance: 'high',
        isCompleted: true
      }, {
        taskId: 2,
        projectId: 1,
        textTask: 'Set up routing',
        taskImportance: 'medium',
        isCompleted: true
      }]
    });
    return <Story />;
  }]
}`,...J.parameters?.docs?.source}}},Y=[`NoTasks`,`WithTasks`,`AllTasksCompleted`]}))();export{J as AllTasksCompleted,K as NoTasks,q as WithTasks,Y as __namedExportsOrder,G as default};