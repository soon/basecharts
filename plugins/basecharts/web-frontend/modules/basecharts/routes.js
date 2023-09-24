import path from 'path'

export const routes = [
  {
    name: 'chartsDashboard',
    path: '/charts/dashboard',
    component: path.resolve(__dirname, 'pages/dashboard.vue'),
  },
]
