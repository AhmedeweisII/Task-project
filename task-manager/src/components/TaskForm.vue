<template>
  <div class="margino">
    <h2>{{ isEdit ? 'Edit Task' : 'Add Task' }}</h2>

    <form @submit.prevent="submitForm" class="die-form">
      <div class="icon"></div>
      <div class="look-box">
        <div class="look-content">
          <input class="look-field" v-model="title" placeholder="Task Title" required />
        </div>
        <textarea
          class="styled-textarea"
          v-model="description"
          placeholder="Enter your Description here..."
        ></textarea>

        <h2>النوع</h2>
        <div class="choosen-flex">
          <label class="radio-lab">
            <input type="radio" value="new" v-model="status" class="radio-circle"  style="margin-right: 15px;" />
            New
          </label>
          <label class="radio-lab">
            <input type="radio" value="In progress" v-model="status" class="radio-circle"  style="margin-right: 15px;" />
            In Progress
          </label>
          <label class="radio-lab">
            <input
              type="radio"
              value="done"
              v-model="status"
              class="radio-circle"
              style="margin-right: 15px;"
            />
            Done
          </label>
        </div>

        <div class="status-radio">
          <label>
            <input type="radio" />
          </label>
        </div>

        <div class="look-content">
          <select class="look-field" v-model="category">
            <option value="" disabled>Select a Category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit">{{ isEdit ? 'Update Task' : 'Add Task' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  data() {
    return {
      title: this.task ? this.task.title : "",
      description: this.task ? this.task.description : "",
      status: this.task ? this.task.status : "new",
      category: this.task ? this.task.category : "",
      isEdit: !!this.task,
      categories: ['Programming', 'Jop', 'Languege' , 'Reading' , 'Video'] // Replace with your actual categories
    };
  },
  methods: {
    async submitForm() {
      const taskData = {
        title: this.title,
        description: this.description,
        status: this.status,
        category: this.category
      };

      const requestOptions = {
        method: this.isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
      };

      try {
        const response = await fetch(
          `http://localhost:3000/tasks${this.isEdit ? `/${this.task.id}` : ""}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        await response.json();
        this.$emit("task-saved");
        this.resetForm();
      } catch (error) {
        console.error("Error saving task:", error);
        alert("Error saving task. Please try again.");
      }
    },
    resetForm() {
      this.title = "";
      this.description = "";
      this.status = "new";
      this.category = "";
    }
  }
};
</script>
@<style scoped>
h2 {
  margin-bottom: 11px;
}
.margino {
      margin-top: 1px;
}
/* 0 Global Rules */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-family: sans-serif;
}

:root {
  /* 0 colors */
  --main-color: red;
  --main-color-alt: #0abf5e;
  --main--color-third: #fc5e37;
  --back-color: #333333;
  /* 1 colors */

  /* 0 standerd fonts*/
  --big-font: 48px;
  --large-font: 32px;
  --Medium-font: 24px;
  --midtower-font: 20px;
  --small-font: 16px;
  --tiny-font: 14px;
  /* 1 standerd fonts */

  /* 0 padds */
  --main-padding-top: 100px;
  --main-padding-bottom: 100px;
  --big-padding: 48px 16px;
  --box-padding: 12px 24px;
  --special-padding: 32px 0;
  --full-padding: 24px;
  --small-padding: 16px;
  /* 1 padds */

  /* 0 marg */
  --flex-margin-top: 8px;
  --flex-margin-bottom: 8px;
  --flex-margin-left: 16px;
  --flex-margin-right: 16px;
  /* 1 marg */

  /*
    big icon2s
      display: block;
      margin: 0 auto;
      width: 110px;
    */

  /* animations*/
  --transition: 0.4s;
}

.small-img {
  width: 30px;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Cairo", sans-serif;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* input {
    font-size: 16px;
}

input:focus {
    outline: transparent;
} */

/* input::placeholder {
    background-color: #DAF9E7 !important;

} */

/* input:focus::placeholder {
   background-color: #DAF9E7 !important;
} */
/* 0 Logo style */
.logo {
  position: relative;
  display: flex;
}

.logo .circle1 {
  position: relative;
  width: 50px;
  height: 50px;
  border: 8px solid white;
  border-radius: 50%;
}

.logo .circle1::before {
  content: " ";
  position: absolute;
  inset: -8px;
  border: 8px solid transparent;
  border-top: 8px solid white;
  border-right: 8px solid white;
  border-radius: 50%;
  z-index: 100;
  transform: rotate(-45deg);
}

.logo .circle2 {
  position: relative;
  width: 50px;
  height: 50px;
  border: 8px solid #f00;
  border-radius: 50%;
  left: -25px;
}
button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: linear-gradient(to right, #c60925, #81030f);
  border-radius: 18px;
  color: white;
}

button:hover {
  background: white;
  color: red;
}

.container {
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

/* 1 Global Rules */

/* 0 Header */
.top2 {
  background-color: black;
}

.navbar {
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  flex-direction: row;
  padding-bottom: 6px;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 5px 0px 10px 0;
  }
}

@media (max-width: 768px) {
  .icon2sy {
    align-self: flex-end;
    padding: 5px 5px 0 0;
  }
}

.brand-link {
  font-size: var(--large-font);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.char {
  padding: 8px;
  background-color: var(--main-color);
  margin-right: 3px;
  color: white;
}

.sec-name {
  color: red;
  margin-left: 6px;
}

.nav-list {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}

.nav-list .list-item {
  padding: 20px 10px;
  margin-left: 0px;
}

.ref {
  color: white;
}

.ref:hover {
  color: var(--main-color);
}

.menu-line {
  width: 20px;
  height: 3px;
  background-color: white;
  margin-bottom: 4px;
}

.menu {
  display: none;
}

@media (max-width: 768px) {
  .menu {
    display: block;
    position: absolute;
    left: 15px;
    top: 15px;
  }

  .nav-list {
    list-style-type: none;
    text-align: center;
    padding-top: 10px;
    display: none;
    overflow: hidden;
  }

  .nav-list .list-item {
    padding-left: 0px;
  }

  .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 0px;
    align-items: flex-start;
    align-self: flex-start;
    background-color: transparent;
  }
}

/* 1 Header */
/* 0 top2*/
.land-top {
  position: relative;
  height: fit-content;
  overflow: hidden;
  display: flex;
}

.land-top::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-image: url('img/1.jpg'); */
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 1;
  /* Adjust opacity as needed */
  z-index: -1;
  /* Ensure the background is behind the content */
}

.land-top::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.land-top.container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120vh;
}

@media (max-width: 768px) {
  .land-top.container {
    height: fit-content;
  }
}

.top-head {
  text-transform: uppercase;
  color: white;
  font-weight: bold;
  border-top: 2px white solid;
  border-bottom: 2px white solid;
  text-align: center;
  width: fit-content;
  padding: 10px 2px;
}

.bio {
  color: white;
  font-weight: bold;
  width: 70%;
  padding: 0 0 90px 0;
  text-align: center;
  line-height: 1.3;
  letter-spacing: 0.8px;
}

.min-projects {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) 50px;
}

@media (max-width: 1200px) {
  .min-projects {
    color: white;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .min-projects {
    justify-content: center;
  }
}

.project {
  background-color: black;
  margin: 10px 20px;
}

.project p {
  padding: 10px 5px;
  margin: 0;
  color: #6c6c6c;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  margin: 0;
  color: white;
}

.info h2,
.info h3 {
  margin: 0;
}

.projects-title {
  display: flex;
  flex-direction: column;
  margin: 10px 11px;
}

.projects-title h2 {
  font-size: 19px;
  color: white;
}

.projects-title p {
  margin: 0px;
  color: white;
  font-size: 16px;
}

.p-cover {
  width: -webkit-fill-available;
}

@media (max-width: 1200px) {
  .p-cover {
    width: 200px;
  }
}

.icon2 {
  width: 30px;
}

.icon2-m {
  width: 70px;
}

.icon2-L {
  width: 100px;
}

.arrow {
  transform: rotateY(180deg);
  padding: 0 0 10px 0;
}

.more {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to bottom, #0980ce, #032480);
  align-items: center;
}

@media (max-width: 1200px) {
  .more {
    margin-left: 22px;
  }
}

@media (max-width: 768px) {
  .more {
    display: none;
  }
}

.p-link {
  color: white;
}

.sub-more {
  display: flex;
  justify-content: center;
  writing-mode: vertical-rl;
  align-items: center;
  padding: 10px 0;
  width: 50px;
}

.sub-more p {
  margin: 0;
}

/* 1 Top*/
/* */
.jops {
  background-color: #111216;
  padding-top: 60px;
}

.jops .container {
  display: grid;
  grid-template-columns: 300px 1fr;
}

@media (max-width: 768px) {
  .jops .container {
    display: flex;
    flex-direction: column;
  }
}

.services-tilte span {
  color: red;
  text-decoration: underline;
}

.services-tilte h2 {
  color: white;
  font-size: 2em;
}

.services-tilte p {
  color: #bbb;
}

.services {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 10px;
  /* Gap between grid items */
  padding: 20px;
  /* Padding around the grid */
}

.service {
  padding: 20px;
  color: white;
  text-align: center;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 2px #d4d4d4;
  border-radius: 5px;
}

.service:hover {
  background-color: #3b3c3f;
}

.service img {
  width: 60px;
  margin-right: 20px;
}

.serv-info {
  text-align: start;
}

.serv-info h3 {
  margin: 10px 0;
  /* Margin around the heading */
}

.serv-info p {
  margin: 10px 0;
  /* Margin around the paragraph */
}

.serv-info a {
  color: red;
  text-decoration: none;
  margin-top: 10px;
  font-size: 15px;
}

/* */
/* */
.about-me {
  padding-top: 60px;
  background-color: #18191d;
}

.about-me .container {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 992px) {
  .about-me .container {
    flex-direction: column-reverse;
  }

  .photo-box {
    overflow: hidden;
    margin-bottom: 20px;
  }
}

.about-me-info {
  flex-grow: 1;
}

.meddile-about {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

.mession-h {
  color: white;
}

.icon2-left {
  margin-right: 10px;
}

.icon2-right {
  margin-left: 30px;
}

.photo-box {
  position: relative;
  z-index: 0;
}

.photo-box::before {
  content: "";
  width: 116%;
  height: 50%;
  background-color: red;
  position: absolute;
  left: -24px;
  top: 25%;
  z-index: -1;
}

.photo-box h2 {
  writing-mode: vertical-lr;
  position: absolute;
  left: -33px;
  top: 30%;
  background-color: red;
  padding: 10px 0px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.photo-box .photoo img {
  width: 270px;
  border: solid white 3px;
  padding: 10px;
}

.my-img {
  background-color: red;
  transform: rotate(180deg);
}

.about-btn {
  margin-top: 20px;
}

/* */
/*  */
.facts {
  background-color: #18191d;
  display: flex;
  justify-content: center;
  padding: 20px 0 60px 0;
}

.facts .container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  text-align: center;
  border-radius: 8px;
  background-color: white;
  gap: 20px;
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 20px;
}

@media (max-width: 992px) {
  .facts .container {
    width: 100%;
  }
}

.fact .number {
  font-size: 32px;
  font-weight: bold;
  margin: 10px;
}

/*  */
/* Start Gallery */
.black {
  background-color: #111216;
  padding-top: 60px;
}

.main-title {
  text-align: center;
  color: red;
  font-size: 32px;
}

.gallery {
  padding-bottom: 60px;
  position: relative;
  background-color: #111216;
}

.head-projects {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gallery .container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
}

.gallery .box {
  padding: 15px;
  background-color: white;
  box-shadow: 0px 12px 20px 0px rgb(0 0 0 / 13%),
    0px 2px 4px 0px rgb(0 0 0 / 12%);
}

.infoo {
  display: flex;
  justify-content: space-between;
  color: black;
  padding: 10px 0;
}

.infoo h2 {
  display: flex;
  align-items: center;
  margin: 0;
}

.gallery .box .image {
  position: relative;
  overflow: hidden;
}

.gallery .box .image::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255 255 255 / 20%);
  width: 0;
  height: 0;
  opacity: 0;
  z-index: 2;
}

.gallery .box .image:hover::before {
  animation: flashing 0.7s;
}

.gallery .box img {
  max-width: 100%;
  transition: 0.3s;
}

.gallery .box .image:hover img {
  transform: rotate(4deg) scale(1.1);
}

.flexe {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.flexe h1 {
  color: black;
}

.curser {
  cursor: pointer;
}

/* 1 Gallery */
/* 0 Lang */
.langauge {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #18191d;
}

@media (max-width: 768px) {
  .langauge {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.die-form {
  display: flex;
  inset: 4px;
  background-color: white;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  width: 100%;
  border: solid 2px #ddd;
}

.icon {
  text-align: center;
  margin-bottom: 10px;
}

.icon img {
  padding: 10px;
  width: 20%;
  background-color: #bc4b51;
  border: 0px transparent solid;
  border-radius: 28%;
}

.icon h2 {
  text-align: center;
}

.cotact {
  flex-basis: 48%;
  padding-top: 60px;
  /* background-image: url(../assets/img/5.jpg); */
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.look-content {
  display: flex;
  flex-direction: column;
}

.look-content span {
  margin-bottom: 10px;
}

label {
  margin-bottom: 8px;
  color: #333;
  font-weight: bold;
}

input[type="text"],
input[type="email"] {
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #daf9e7;
}

input[type="text"]:focus,
input[type="email"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.styled-textarea {
  width: 100%;
  max-width: 600px;
  height: 252px;
  padding: 15px;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  color: #333;
  background-color: #daf9e7;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.styled-textarea:focus {
  border-color: #66afe9;
  box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
  outline: none;
}

.langauges {
  display: flex;
  flex-direction: column;
  flex-basis: 48%;
  background-color: #18191d;
  padding-top: 60px;
  height: 100%;
}

.langauges .cols {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 40px;
}

@media (max-width: 768px) {
  .langauges .cols {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

.min-col h2 {
  color: red;
}

.min-col h3 {
  color: black;
  padding: 15px 30px;
  background-color: white;
  border-radius: 8px;
  width: 136px;
  text-align: center;
  transition: 0.5s;
  cursor: pointer;
}

.min-col h3:hover {
  color: white;
  background-color: #f93357;
}

.sen-btn {
  margin-top: 20px;
}

.sen-btn:hover {
  background-color: black;
  color: white;
}

/* 1 Lang  */

/* 0 certifcate */
.certifcate {
  padding-top: 60px;
  padding-bottom: 100px;
  background-color: #ddd;
}

.services-tilte .tit {
  font-weight: bold;
}

.slider {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.slider-inner {
  display: flex;
  transition: transform 1s ease;
}

.slide {
  width: 350px;
  margin: 0 10px; /* Add 10px margin on left and right */
  flex-shrink: 0;
  cursor: pointer;
}

.icon2-xl {
  width: 300px;
}
/* Full-Screen Image Modal */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
}

.close {
  position: absolute;
  top: 20px;
  right: 35px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
/* 1 certifcate */

/* 0 footer */
.foot {
  background-color: #16181c;
  padding-top: 60px;
  padding-bottom: 30px;
}
.foot .container .up-footer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}
.one-col {
  color: white;
}
.brand-linkII {
  justify-content: flex-start;
  margin: 20px 0 30px 0;
}
.socila-icons {
  display: flex;
  justify-content: space-between;
}
.photoos {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
}
.backgrond {
  padding: 10px;
  background-color: white;
  width: fit-content;
  margin: 10px;
}
.contacty {
  display: grid;
}
.contact-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.contact-row div {
  margin-left: 20px;
}
.servo {
  display: grid;
  margin-left: 30px;
}
@media (max-width: 768px) {
  .servo {
    margin-left: 0px;
  }
}
.down-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: white;
  border-top: solid white 2px;
  margin-top: 20px;
}
.down-footer div {
  margin-top: 30px;
}
.fr-d {
  font-weight: bold;
  font-size: 24px;
}
/* Style for the list item */
.li-item {
  list-style: none; /* Remove bullet points */
  margin: 10px 0; /* Add some margin for spacing */
}

/* Style for the anchor tag */
.youtube-link {
  text-decoration: none; /* Remove underline from links */
  color: white; /* Set text color to white */
  display: inline-block; /* Ensure the link is treated as a block element */
  transition: color 0.3s; /* Add a transition for a smooth hover effect */
}

/* Hover effect for the anchor tag */
.youtube-link:hover {
  color: #ccc; /* Change color on hover */
}

/* Style for the SVG */
.youtube-svg {
  fill: white; /* Set SVG fill color to white */
  width: 1.5em; /* Adjust the size of the SVG */
  height: 1.5em; /* Adjust the size of the SVG */
  transition: fill 0.3s; /* Add a transition for a smooth hover effect */
}

/* Hover effect for the SVG */
.youtube-link:hover .youtube-svg {
  fill: #ccc; /* Change SVG fill color on hover */
}
/* 1 footer */
/* 0 */
/* 1 */

@keyframes flashing {
  0%,
  40% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    width: 200%;
    height: 200%;
  }
}
.look-field {
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #daf9e7;
}
.choosen-flex {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.radio-lab {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--midtower-font);
  position: relative;
}
@media (max-width: 768px) {
  .radio-lab {
    font-size: 14px;
  }
}
.radio-circle {
  transform: scale(1.4);
  margin-left: 10px;
  border: 2px solid black;
  /* Border color */
  border-radius: 50%;
  /* Make it circular */
  width: 20px;
  /* Set width and height to create a circular shape */
  height: 20px;
}
@media (max-width: 768px) {
  .radio-circle {
    transform: scale(1);
    margin-left: 5px;
  }
}
input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
}
input[type="radio"]:checked + label::before {
  border-color: var(--blue-color);
}
input[type="radio"]:checked + label::after {
  transform: scale(1);
}
input[type="radio"]:checked + .server {
  border-color: var(--blue-color);
  color: var(--blue-color);
}
input[type="radio"]:checked {
  -webkit-appearance: none;
  /* Remove default styles */
  appearance: none;
}

input[type="radio"]:checked {
  background-color: var(--main-color);
  /* Change background color when selected */
}
</style>
