import phantom from 'phantom';
import 'should';

describe('Check Page Status, should not be 500 or 404 NotFound', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  const server = 'http://localhost:5000';
  let instance, page;

  beforeEach(async () => {
    instance = await phantom.create();
    page = await instance.createPage();
  });

  it('Index', async (done) => {
    try {
      const url = `${server}?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('Category', async (done) => {
    try {
      const url = `${server}/cat/sport?ad=0&page=2'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('Topic', async (done) => {
    try {
      const url = `${server}/topic?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('Instant', async (done) => {
    try {
      const url = `${server}/instant?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('Interest', async (done) => {
    try {
      const url = `${server}/interest?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('LBS', async (done) => {
    try {
      const url = `${server}/lbs?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('Channel', async (done) => {
    try {
      const url = `${server}/channel/7?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('Video Instant', async (done) => {
    try {
      const url = `${server}/video/instant?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('Video Index', async (done) => {
    try {
      const url = `${server}/video/index?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('LY Live', async (done) => {
    try {
      const url = `${server}/lylive/1?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  it('Author', async (done) => {
    try {
      // NOWnews 新聞的作者
      const url = `${server}/author/530000000000000000000003?ad=0'`;
      const status = await page.open(url);
      status.should.be.equal('success');
      const content = await page.property('content');
      const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
      content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
      has404NotFound.should.be.false();
      return done();
    } catch (e) {
      return done(e);
    }
  });

  describe('Diffrent News', () => {
    it('Type = NEWS', async (done) => {
      try {
        const url = `${server}/news/20170805/2596745?ad=0'`;
        const status = await page.open(url);
        status.should.be.equal('success');
        const content = await page.property('content');
        const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
        content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
        has404NotFound.should.be.false();
        return done();
      } catch (e) {
        return done(e);
      }
    });

    it('Type = PHOTO', async (done) => {
      try {
        const url = `${server}/news/20170807/2597096?ad=0'`;
        const status = await page.open(url);
        status.should.be.equal('success');
        const content = await page.property('content');
        const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
        content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
        has404NotFound.should.be.false();
        return done();
      } catch (e) {
        return done(e);
      }
    });

    it('Type = VIDEO', async (done) => {
      try {
        const url = `${server}/news/20170805/2596177?ad=0'`;
        const status = await page.open(url);
        status.should.be.equal('success');
        const content = await page.property('content');
        const has404NotFound = content.indexOf('<div id="NotFound"') > 0;
        content.should.not.be.equal('<html><head></head><body>Internal server error</body></html>');
        has404NotFound.should.be.false();
        return done();
      } catch (e) {
        return done(e);
      }
    });
  });
});
