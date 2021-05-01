export function get_userroutes(menulist) {
  const routlist = [];
  const root = menulist.filter((item) => {
    return item.pid === 0;
  });
  root.forEach((item) => {
    const haschild = menulist.filter((sitem) => {
      return sitem.pid === item.id
    });
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
  const sub = list.filter((sitem) => {
    return sitem.pid === item.id;
  })
  sub.forEach((i) => {
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
      const haschild = list.filter((c) => {
        return c.pid === i.id && c.menutype !== '02'
      }).length;
      if (haschild > 0) {
        mitem.children = submenu(list, i);
      }
      const fun = list.filter(f => {
        return f.pid === i.id
      });
      if (fun.length > 0) {
        mitem.meta.fun = fun;
      }
      slist.push(mitem);
    }
  });
  return slist;
}
