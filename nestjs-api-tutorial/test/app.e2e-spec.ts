import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDTO } from 'src/auth/dto';
import { EditUserDTO } from 'src/user/dto';
import { AppModule } from '../src/app.module';

import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Solo tomará los valores definidos en DTO, lo otro lo ignora
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto = { email: 'test@gmail.com', password: 'secret_pass' };
    describe('SignUp', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400)
          .inspect(); // <- Si quiero ver que esta pasando
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400); // <- Si quiero ver que esta pasando
      });

      it('Should signUp', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('SignIn', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('Should signIn', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token'); //Guarda un valor de un request que hagamos
      });
    });
  });

  describe('User', () => {
    it('getMe', () => {
      return pactum
        .spec()
        .get('/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200);
    });

    it('editUser', () => {
      const dto: EditUserDTO = {
        firstName: 'ChangedName',
        email: 'ChangedEmail@gmail.com',
      };
      return pactum
        .spec()
        .patch('/users')
        .withBody(dto)
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200)
        .expectBodyContains(dto.email)
        .inspect();
    });
  });

  describe('Bookmark', () => {
    it('Get Empty Bookmarks', () => {
      return undefined;
    });

    it('Create Bookmark', () => {
      return undefined;
    });
    it('Get Bookmarks', () => {
      return undefined;
    });
    it('Get Bookmark by Id', () => {
      return undefined;
    });
    it('Edit Bookmark by Id', () => {
      return undefined;
    });
    it('Delete Bookmark by Id', () => {
      return undefined;
    });
  });
});
