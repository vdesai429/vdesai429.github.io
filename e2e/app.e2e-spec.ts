import { Materialize2Page } from './app.po';

describe('materialize2 App', function() {
  let page: Materialize2Page;

  beforeEach(() => {
    page = new Materialize2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
