import {
  PotionDifficultyLevelsPage,
  CreatePotionDifficultyLevelPage,
  PotionDifficultyLevelPage,
  EditPotionDifficultyLevelPage
} from '.'

export default [
  { path: '/potion-difficulty-levels', component: PotionDifficultyLevelsPage },
  { path: '/potion-difficulty-levels/create', component: CreatePotionDifficultyLevelPage },
  { path: '/potion-difficulty-levels/:id', component: PotionDifficultyLevelPage },
  { path: '/potion-difficulty-levels/:id/edit', component: EditPotionDifficultyLevelPage }
]
