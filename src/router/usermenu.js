export function get_user_menus(menulist)
{
    const routlist = [];
    menulist.forEach(item => {
        const haschild = item.child;
        let mitem = {};
    if (item.path === '/') {
      mitem = {
        path: item.path,
        name: item.code,
        component: () => import('@/layout/index.vue'),
        hidden: true,
        redirect: haschild.length > 0 ? '/' + haschild[0].path : '',
        meta: {
          title: item.title,
          icon: item.icon
        }
      }
    } else {
      mitem = {
        path: item.path,
        name: item.code,
        component: () => import('@/layout/index.vue'),
        meta: {
          title: item.title,
          icon: item.icon
        }
      };
    }
    if (haschild.length > 0) {
        mitem.children = submenu(menulist, item);
      }
      routlist.push(mitem);

    });

    routlist.push({
        path: '*',
        redirect: '/404',
        hidden: true
      });
      return routlist;
}

function submenu(list, item) {
    const slist = [];
    list.forEach((i) => {
      let mitem = {};
      if (i.menutype === '02') {
        mitem = {
          path: i.path,
          name: i.code,
          component: (resolve) => require(['@/views/' + i.viewpath + '.vue'], resolve),
          meta: {
            title: i.title,
            icon: i.icon
          }
        };
        const haschild = list.child.length;
        if (haschild > 0) {
          mitem.children = submenu(list.child, i);
        }
          mitem.meta.fun = i.funs;
        
        slist.push(mitem);
      }
    });
    return slist;
  }