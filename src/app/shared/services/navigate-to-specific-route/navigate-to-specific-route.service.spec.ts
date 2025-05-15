import { TestBed } from "@angular/core/testing";

import { NavigateToSpecificRouteService } from "./navigate-to-specific-route.service";

describe("NavigateToSpecificRouteService", () => {
  let service: NavigateToSpecificRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigateToSpecificRouteService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
