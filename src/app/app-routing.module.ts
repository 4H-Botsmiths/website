import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { PostComponent } from './news/post/post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChallengeComponent } from './programs/fll/challenge/challenge.component';
import { ExploreComponent } from './programs/fll/explore/explore.component';
import { FrcComponent } from './programs/frc/frc.component';
import { FtcComponent } from './programs/ftc/ftc.component';
import { MinecraftComponent } from './programs/minecraft/minecraft.component';
import { SponsorsComponent } from './sponsors/sponsors.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent, data: {
      title: 'Home',
      description: 'The Botsmiths is a team located in Snohomish County Washington and sponsored by the Snohomish County 4-H Technology Program. As a 4-H Technology Program offering, 4-H Clubs from across Snohomish County you are welcome to join the Botsmiths! The 4-H Technology Botsmiths offers opportunities for youth in First Robotics Competition, First Tech Challenge, First Lego League, and First Lego League Junior.',
      keywords: ['Home'],
    }
  },
  { path: 'home', redirectTo: '' },
  {
    path: 'sponsors', component: SponsorsComponent, data: {
      title: 'Sponsors',
      description: '4-H Botsmiths Sponsors',
      keywords: ['Sponsors'],
    }, children: [
      { path: '', component: SponsorsComponent },
      {
        path: 'options', component: SponsorsComponent, data: {
          title: 'Sponsor Options',
          description: '4-H Botsmiths Sponsor Options',
          keywords: ['Sponsors', 'Plans', 'Options'],
        }
      },
      {
        path: 'contact-us', component: SponsorsComponent, data: {
          title: 'Become A Sponsor',
          keywords: ['Sponsors', 'Contact']
        }
      }
    ]
  },
  {
    path: 'news', children: [
      { path: '', component: NewsComponent },
      { path: ':post', component: PostComponent }
    ], data: {
      title: 'News',
      description: '4-H Botsmiths News',
      keywords: ['News', 'Blog', 'Posts'],
    }
  },
  {
    path: 'programs', children: [
      { path: '', redirectTo: 'frc', pathMatch: 'full' },
      {
        path: 'frc', component: FrcComponent, data: {
          title: 'FRC',
          keywords: ['FRC'],
        }
      },
      {
        path: 'ftc', component: FtcComponent, data: {
          title: 'FTC',
          keywords: ['FTC'],
        }
      },
      {
        path: 'fll', children: [
          { path: '', redirectTo: 'challenge', pathMatch: 'full' },
          {
            path: 'challenge', component: ChallengeComponent, data: {
              title: 'FLL Challenge',
              keywords: ['FLL', 'Challenge']
            }
          },
          {
            path: 'explore', component: ExploreComponent, data: {
              title: 'FLL Explore',
              keywords: ['FLL', 'Explore']
            }
          },
        ]
      },
      {
        path: 'minecraft', component: MinecraftComponent, data: {
          title: 'Minecraft',
          keywords: ['Minecraft', 'Microsoft']
        }
      }
    ]
  },
  {
    path: 'contact-us', component: ContactUsComponent, data: {
      title: 'Become A Botsmith',
      keywords: ['Contact']
    }
  },
  {
    path: '**', pathMatch: 'full', component: PageNotFoundComponent, data: {
      title: 'Page Not Found'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
