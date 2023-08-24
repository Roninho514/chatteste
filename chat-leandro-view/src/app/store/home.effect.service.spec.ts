import { TestBed } from '@angular/core/testing';

import { HomeEffectService } from './home.effect.service';

describe('HomeEffectService', () => {
  let service: HomeEffectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeEffectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
