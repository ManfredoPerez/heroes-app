import { Component } from '@angular/core';
import { SidebarMenu } from '@modules/heroes/models/sidebar-menu.models';

@Component({
  templateUrl: './layout-page.component.html'
})
export class LayoutPageComponent {
  public sidebarItems: SidebarMenu[] = [
    { label: 'Listado', icon: 'label', url:'./list'},
    { label: 'Añadir', icon: 'add', url:'./new-hero'},
    { label: 'Buscar', icon: 'search', url:'./search'},
  ]
}
