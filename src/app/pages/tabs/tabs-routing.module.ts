import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'plan',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../my-plan-list/my-plan-list.module').then(m => m.MyPlanListPageModule)
          },
          {
            path: 'plan-form',
            loadChildren: () =>
              import('../plan-form/plan-form.module').then(m => m.PlanFormPageModule)
          },
          {
            path: 'wishlist_main',
            loadChildren: () =>
              import('../wishlistmain/wishlistmain.module').then(m => m.WishlistmainPageModule)
          },
          {
            path: 'wishlist_create',
            loadChildren: () =>
              import('../wishlist-create/wishlist-create.module').then(m => m.WishlistCreatePageModule)
          }
        ]
      },
      {
        path: 'journal',
        children: [
          {
            path: '',
            loadChildren: () => import('../journal/journal.module').then(m => m.JournalPageModule)
          },
          {
            path: 'journal-details',
            loadChildren: () =>
              import('../journal-details/journal-details.module').then(
                m => m.JournalDetailsPageModule
              )
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      //{
        //path: 'wishlist',
        //children: [
          //{
            //path: '',
            //loadChildren: () =>
              //import('../wishlist/wishlist.module').then(m => m.WishlistPageModule)
          //}
        //]
      //},
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
