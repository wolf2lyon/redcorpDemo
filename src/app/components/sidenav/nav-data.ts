import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routelink: 'panel',
    icon: 'fa-solid fa-house',
    label: 'Panel',
    rol:'ADMIN'
  },
  {
    routelink: '',
    icon: 'fa-solid fa-users',
    label: 'Usuarios',
    items: [
      {
        routelink: 'usuarios/nuevo',
        label: 'Crear Usuario',
      },
      {
        routelink: 'usuarios',
        label: 'Listar Usuarios',
      },
      {
        routelink: '',
        label: 'Roles',
        items: [
          {
            routelink: 'roles/nuevo',
            label: 'Crear Rol',
          },
          {
            routelink: 'roles',
            label: 'Listar Roles',
          },
        ],
      },
      {
        routelink: '',
        label: 'Miembro de Area',
        items: [
          {
            routelink: 'miembrodearea/nuevo',
            label: 'Crear miembro',
          },
          {
            routelink: 'miembrodearea',
            label: 'Listar miembros',
          },
        ],
      },
      {
        routelink: '',
        label: 'Area de trabajo',
        items: [
          {
            routelink: 'areaTrabajo/nuevo',
            label: 'Crear area',
            rol:'EMPLO'
          },
          {
            routelink: 'areaTrabajo',
            label: 'Listar areas',
            rol:'EMPLO'
          },
        ],
        rol:'EMPLO'
      },
    ],
    rol:'EMPLO'
  },
  {
    routelink: '',
    icon: 'fa-solid fa-message',
    label: 'Comunicado',
    items: [
      {
        routelink: 'comunicado/nuevo',
        label: 'Crear comunicado',

      },
      {
        routelink: 'comunicado',
        label: 'Listar comunicados',
        rol:'EMPLO'
      },
    ],
    rol:'EMPLO'
  },
  {
    routelink: '',
    icon: 'fa-solid fa-suitcase',
    label: 'Proyectos',
    items: [
      {
        routelink: 'proyecto/nuevo',
        label: 'Crear proyecto',
      },
      {
        routelink: 'proyecto',
        label: 'Listar proyecto',
      },
      {
        routelink: '',
        label: 'Grupos de proyecto',
        items: [
          {
            routelink: 'grupo-proyecto/nuevo',
            label: 'Crear grupos',
          },
          {
            routelink: 'grupo-proyecto',
            label: 'Listar grupos',
          },
        ],
      },
      {
        routelink: '',
        label: 'Miembro de proyecto',
        items: [
          {
            routelink: 'miembrogrupo/nuevo',
            label: 'Crear miembro',
          },
          {
            routelink: 'miembrogrupo',
            label: 'Listar miembros',
          },
        ],
      },
    ],
  },
  {
    routelink: 'tarea',
    icon: 'fa-solid  fa-list-check',
    label: 'Tareas',
    items: [
      {
        routelink: 'tarea/nuevo',
        label: 'Crear tareas',
        rol:'EMPLO'
      },
      {
        routelink: 'tarea',
        label: 'Listar tareas',
        rol:'EMPLO'
      },
      {
        routelink:'',
        label:'Asociar Miembro',
        items:[
            {
                routelink: 'tarea-miembro-area/nuevo',
                label: 'Asociar miembro',
            },
            {
                routelink: 'tarea-miembro-area',
                label: 'Listar miembros',
            }
        ]
      },
      {
        routelink:'',
        label:'Comentarios',
        items:[
            {
                routelink: 'comentario/nuevo',
                label: 'Crear comentario',
            },
            {
                routelink: 'comentario',
                label: 'Listar comentarios',
            }
        ]
      }
    ],
    rol:'EMPLO'
  },
  {
    routelink:'',
    icon:'fa-solid fa-toolbox',
    label:'Tools',
    rol:'ADMIN',
    items:[
      {
        routelink:'tools/query1',
        label:'Query 1',
        rol:'ADMIN'
      },
      {
        routelink:'tools/query2',
        label:'Query 2',
        rol:'ADMIN'
      },
      {
        routelink:'tools/query3',
        label:'Query 3',
        rol:'ADMIN'
      },
      {
        routelink:'tools/query4',
        label:'Query 4',
        rol:'ADMIN'
      },
      {
        routelink:'tools/query5',
        label:'Query 5',
        rol:'ADMIN'
      },
      {
        routelink:'tools/query6',
        label:'Query 6',
        rol:'ADMIN'
      }
    ]
  }
];
