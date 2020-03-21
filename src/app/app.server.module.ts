import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'; // MapLoaderModule doesn't work on Angular Universal 9

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule
    // , ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
