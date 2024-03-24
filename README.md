# Nyxie-taut

A Nyxie-taut template serves as a ready-made and pre-configured web development project, providing a solid starting point for creating blogs,portfolio websites or web-based CVs.

Filled template:
<img src="https://i.imgur.com/f1WEhX0.png"/>

<hr/>

## Run

`npm run develop`

## Customization:

<ol>
<li>Press "Fork" the repository <img src="https://i.imgur.com/SNbR5Qh.jpg"/></li>
<li>If you want to deploy it to Github Pages, please name it like that: username.github.io, for example: devnyxie.githib.io

</li>

<li>Profile customization:
    <ol>
      <li>Open src/personalization/profile.json</li>
      <li>Change to your name, enter your bio, and enter social media usernames if you have any.</li>
      <li>Put image of your choice in src/images/ as profile_picture.jpg</li>
    </ol>
</li>
<li>Site customization:
    <ol>
      <li>Open src/personalization/site.json</li>
      <li>Change site name, description etc. You have ability to choose any Google Font you like, for example: "Playpen Sans", "Poppins", "Montserrat". Keep in mind that font name is case sensetive. </li>
      <li>Replace favicon.ico in folder "static".</li>
    </ol>
</li>
<li>Blog/Projects
    <ol>
      <li>Open src/content/blog or src/content/projects</li>
      <li>Drop your projects/blogs in markdown in these folders, and they will be automatically grabbed in build time.
      <br/>
       Note: <br/> Please use this format for your blog/projects: <strong>date+title.md</strong>. <br/>Example: 2023-09-01-my-blog.md</li>
    </ol>
</li>
<li>This is it. It's ready for production! Create an account on any hosting platform like Vercel, choose repository you want to deploy and wait a minute until it's deployed.
</li>
</ol>

## Deploying to Github Pages:

<ol>
<li>Name your forked repository as username.github.io as we have mentioned before. <img src="https://i.imgur.com/XTLPV4J.png"/></li>
<li>Enable the workflows: <img src="https://i.imgur.com/kR3rJGe.png"/></li>
<li>Head over to settings of your forked repository to enable Github Pages (don't forget to click "Save"!): <img src="https://i.imgur.com/Bpmu3fA.png"/><img src="https://i.imgur.com/CclHfb3.png"/></li>
<li>Select Gatsby workflow and click <strong>Run workflow</strong>: <img src="https://i.imgur.com/7JoEJs2.jpg"/><img src="https://i.imgur.com/9DZZ0Z2.png"/></li>
<li>An action will start which will take up to 2 minutes. After, your website must be already live at https://username.github.io 🤍</li>

</ol>

<div align="center">Thank you! <br/> Feel free to star the repository 🤍</div>

<hr/>

### What is a Gatsby template?

Gatsby is a popular open-source framework known for creating fast and efficient websites. In the world of Gatsby, templates are like starter kits that come with ready-made files, settings, and often a basic structure. They provide a solid starting point for web developers, making it easier to begin their projects. These templates can be customized to fit a project's specific needs, making it quicker to start development.

In simple terms, Gatsby takes your content and turns it into a static website. It uses nodes and GraphQL to efficiently fetch and display data. Plus, it allows you to host your website for free using static site hosting services (for example: Vercel, Github Pages, Netlify). This makes hosting easy, resulting in speedy, cost-effective, and low-maintenance websites.

<hr/>

For further insights on how Gatsby blogs operate, you can refer to the documentation provided here: [How Gatsby Blogs Work 🔗](https://www.gatsbyjs.com/docs/conceptual/overview-of-the-gatsby-build-process/)

<hr/>

### Special Thanks

This project would have been much more challenging without **Nikola Đuza's** invaluable tutorial on building a Gatsby blog from the ground up, which you can find [here](https://blog.logrocket.com/creating-a-gatsby-blog-from-scratch/).
