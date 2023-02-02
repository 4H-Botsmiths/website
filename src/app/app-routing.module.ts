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


export const routes: Routes = [
  {
    path: '', component: HomeComponent, data: {
      title: 'Home',
      description: 'The Botsmiths is a team located in Snohomish County Washington and sponsored by the Snohomish County 4-H Technology Program. As a 4-H Technology Program offering, 4-H Clubs from across Snohomish County you are welcome to join the Botsmiths! The 4-H Technology Botsmiths offers opportunities for youth in First Robotics Competition, First Tech Challenge, First Lego League, and First Lego League Junior.',
      keywords: ['Home'],
    }
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
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
      { path: '', component: PageNotFoundComponent, pathMatch: 'full' },
      {
        path: 'frc', component: FrcComponent, data: {
          title: 'FRC',
          description: 'Recommended for ages 14-18, kids design, build, and operate a large robot from custom parts to compete in a head-to-head competition in a 3-team alliance format. The size of FRC teams allows members to specialize their skills. Build season begins in January and Competitions begins in March. Teams are minimally 12 members.',
          keywords: ['FRC'],
        }
      },
      {
        path: 'ftc', component: FtcComponent, data: {
          title: 'FTC',
          description: 'Recommended for ages 13-18, kids use Metal, plastic, and 3D-printed parts to design, build, and operate 18” robots to compete in a head-to-head challenges in a 2-team alliance format using programs written in Java. Members then compete at FIRST competitions in November and December. Teams are typically 8-15 members.',
          keywords: ['FTC'],
        }
      },
      {
        path: 'fll', children: [
          { path: '', component: PageNotFoundComponent, pathMatch: 'full' },
          {
            path: 'challenge', component: ChallengeComponent, data: {
              title: 'FLL Challenge',
              description: 'Recommended for ages 9-13, kids use LEGO Mindstorms EV3s or LEGO Spike Prime robotics kits to design and build mobile robots to complete on an obstacle course and build moderately complex programs using block programming. Members then compete at FIRST competitions in December. Spring activities build skills for future competition. Teams are typically 4-8 members.',
              keywords: ['FLL', 'Challenge']
            }
          },
          {
            path: 'explore', component: ExploreComponent, data: {
              title: 'FLL Explore',
              description: 'Recommended for ages 5-8, kids use LEGO Spike Essentials robotics kits to build simple robots and build basic programs with block programming. Members exhibit a project non-competitively in the spring. Parents should plan to attend.',
              keywords: ['FLL', 'Explore']
            }
          },
        ]
      },
      {
        path: 'minecraft', component: MinecraftComponent, data: {
          title: 'Minecraft',
          description: 'Recommended for ages 5-18, Join a team of youth to make scale model builds based on real places using maps, photos, and measurements. In 2021, youth built the Evergreen State Fairgrounds and in 2022, they began building the Washington D.C. State Capitol. Older youth may become involved in server administration and project management tasks.',
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
    onSameUrlNavigation: 'reload',
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
