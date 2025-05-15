import { Routes } from "@angular/router";
import { SignInPageComponent } from "./pages/sign-in-page/sign-in-page.component";
import { SignUpPageComponent } from "./pages/sign-up-page/sign-up-page.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/main-page/main-page.routes").then((m) => m.mainRoutes),
  },
  {
    path: "sign-in",
    component: SignInPageComponent,
  },
  {
    path: "sign-up",
    component: SignUpPageComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];
