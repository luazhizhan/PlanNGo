import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'plan',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../plan/plan.module').then(m => m.PlanPageModule)
          }
        ]
      },
      {
        path: 'journal',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../journal/journal.module').then(m => m.JournalPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
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
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
