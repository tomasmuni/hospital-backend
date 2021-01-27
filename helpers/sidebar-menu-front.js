const obtenerSideBar = (role = 'ADMIN_ROLE') => {


    const menu = generarSideBarBase();

    if (role === 'ADMIN_ROLE') menu[1].subMenu.unshift( { title: 'Usuarios', url:'usuarios'});

      return menu;


}


const generarSideBarBase = () => {

    return [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          subMenu: [
            {title: 'Dashboard', url:'/'},
            {title: 'ProgressBar', url:'progress'},
            {title: 'Grafica', url:'grafica'},
            {title: 'Promesa', url:'promesa'},
            {title: 'Rxjs', url:'rxjs'},
          ],
        },
        {
          title: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          subMenu: [
            {title: 'Hospitales', url:'hospitales'},
            {title: 'Medicos', url:'medicos'},
          ],
        },
      ];
}

module.exports = {
    obtenerSideBar
}