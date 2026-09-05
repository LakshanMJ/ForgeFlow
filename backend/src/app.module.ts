import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.modules';
import { DepartmentsModule } from './departments/departments.modules';
import { MailModule } from './mail/mail.module';
import { ProjectCategoriesModule } from './meta/project-categories/project-categories.modules';

@Module({
  imports: [
    AuthModule,
    ProjectsModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    DepartmentsModule,
    MailModule,
    ProjectCategoriesModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }