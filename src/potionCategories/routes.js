import {
  PotionCategoriesPage,
  CreatePotionCategoryPage,
  EditPotionCategoryPage,
  PotionCategoryPage
} from '.'

export default [
  { path: '/potion-categories', component: PotionCategoriesPage },
  { path: '/potion-categories/create', component: CreatePotionCategoryPage },
  { path: '/potion-categories/:id/edit', component: EditPotionCategoryPage },
  { path: '/potion-categories/:id', component: PotionCategoryPage }
]
