<!--<template>-->
<!--  <v-container class="mt-8">-->
<!--    <v-row justify="center">-->
<!--      <v-col cols="12" md="8">-->
<!--        <v-card elevation="6" class="pa-6">-->
<!--          <v-card-title class="text-h5">Create Lightnovels</v-card-title>-->

<!--          <v-form ref="formRef" v-model="formValid" validate-on="input" @submit.prevent="submit">-->
<!--            <v-text-field-->
<!--              v-model="name"-->
<!--              label="Name"-->
<!--              :rules="[rules.required(), rules.lettersOnly()]"-->
<!--              class="mt-4"-->
<!--            ></v-text-field>-->

<!--            <v-text-field-->
<!--              v-model="price"-->
<!--              label="Price"-->
<!--              type="number"-->
<!--              :rules="[rules.required(), rules.minValue(0), rules.numberOnly()]"-->
<!--              class="mt-4"-->
<!--            ></v-text-field>-->

<!--            <v-text-field-->
<!--              v-model="description"-->
<!--              label="Description"-->
<!--              :rules="[rules.required(), rules.lettersOnly()]"-->
<!--              class="mt-4"-->
<!--            ></v-text-field>-->

<!--            <v-text-field-->
<!--              v-model="genre"-->
<!--              label="Genre"-->
<!--              :rules="[rules.required(), rules.lettersOnly()]"-->
<!--              class="mt-4"-->
<!--            ></v-text-field>-->

<!--            <v-btn-->
<!--              color="primary"-->
<!--              class="mt-6"-->
<!--              type="submit"-->
<!--              :loading="loading"-->
<!--              :disabled="!formValid"-->
<!--            >-->
<!--              Create-->
<!--            </v-btn>-->

<!--            <v-btn-->
<!--              color="primary"-->
<!--              class="mt-4"-->
<!--              variant="outlined"-->
<!--              :to="{ name: 'lightnovel-edit-page', params: { id: 6 } }"-->
<!--            >-->
<!--              Update page-->
<!--            </v-btn>-->
<!--          </v-form>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--  </v-container>-->
<!--</template>-->
