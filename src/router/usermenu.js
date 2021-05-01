export function get_user_menus(menulist) {
  const routlist = [];
  menulist.forEach(item => {
    let mitem = {};
    mitem = {
      path: item.path,
      name: item.code,
      component: () => import('@/layout/index.vue'),
      meta: {
        title: item.title,
        icon: item.icon
      }
    };
    if(item.children.length > 0){
      mitem.children = submenu(item.children);
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
function submenu(sub) {
  const slist = [];
  sub.forEach((i) => {
    let mitem = {};
      mitem = {
        path: i.path,
        name: i.code,
        component: (resolve) => require(['@/views/' + i.viewpath + '.vue'], resolve),
        meta: {
          title: i.title,
          icon: i.icon
        }
      };
      const haschild = i.children.length;
      if (haschild > 0) {
        mitem.children = submenu(i.children);
      }
      slist.push(mitem);
  });
  return slist;
}