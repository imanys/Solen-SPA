import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  PRIMARY_OUTLET
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  styleUrls: ['breadcrumb.component.scss'],
  template: `
    <ul class="breadcrumb">
      <li *ngFor="let breadcrumb of breadcrumbs" class="breadcrumb-item">
          {{ breadcrumb.label }}
      </li>
    </ul>
  `
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const breadcrumb: Breadcrumb = {
      label: ''
    };

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const root: ActivatedRoute = this.route.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
        this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
      });
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length === 0) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, breadcrumbs);
      }

      const breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
      };
      breadcrumbs.push(breadcrumb);

      return this.getBreadcrumbs(child, breadcrumbs);
    }
    return breadcrumbs;
  }
}

interface Breadcrumb {
  label: string;
}
