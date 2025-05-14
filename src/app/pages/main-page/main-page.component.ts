import { Component, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../../shared/interfaces/book";
import { Cosmetics } from "../../shared/interfaces/cosmetics";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: "app-main-page",
  imports: [HeaderComponent, FooterComponent],
  templateUrl: "./main-page.component.html",
  styleUrl: "./main-page.component.scss",
})
export class MainPageComponent {
  public title = "cudo-shop";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public goToSignInPage() {
    this.router.navigate(["/sign-in"], { relativeTo: this.route });
  }

  public goToSignUpPage() {
    this.router.navigate(["/sign-up"], { relativeTo: this.route });
  }

  public books = signal<Book[]>([
    {
      id: 1,
      title: "School",
    },
    {
      id: 2,
      title: "Home",
    },
    {
      id: 3,
      title: "Work",
    },
  ]);

  public cosmetics = signal<Cosmetics[]>([
    {
      id: 1,
      title: "Hair care",
    },
    {
      id: 2,
      title: "Skincare",
    },
    {
      id: 3,
      title: "Perfume",
    },
  ]);
}
