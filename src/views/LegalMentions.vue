<template>
  <div id="legal-mentions">
    <div class="h-70 bg-pokemon-red-300">
      <BaseLogo class="flex justify-center pt-10 pb-5" />
    </div>
    <div class="text-4xl py-14 sm:text-5xl lg:text-6xl flex justify-center">
      <p>
        <span class="text-indigo-600">L</span>egal
        <span class="text-indigo-600"> M</span>entions
      </p>
    </div>
    <div class="container mx-auto px-4">
      <p class="text-3xl py-8 ml-3">
        <span class="text-indigo-600">D</span>efinitions
      </p>
      <p>
        Website : https://pokedex-vue-vlyjm.netlify.app/<br />
        User : Internet user connecting, using the aforementioned site.<br />
        Benefits and Services: the site provides Users with.<br />
        Content : All the constituent elements of the information present on the
        site, in particular texts – images – videos. <br />
        User information : Hereinafter referred to as "Information(s)" which
        correspond to all the personal data likely to be held by the site for
        the management of your account, the management of the relationship of
        users and for the purposes of analysis and statistics. <br />
        Personal information : “Information which allows, in any form
        whatsoever, directly or indirectly, the identification of the natural
        persons to whom it applies” (article 4 of law n° 78-17 of January 6,
        1978).<br />
        The terms “personal data”, “person concerned”, “subcontractor” and
        “sensitive data” have the meaning defined by the General Data Protection
        Regulations (RGPD: n° 2016-679).
      </p>

      <p class="text-3xl py-8 ml-3">
        <span class="text-indigo-600">1</span>. Presentation of the website
      </p>
      <p>
        Under Article 6 of Law No. 2004-575 of June 21, 2004 on confidence in
        the digital economy, users of the website
        https://pokedex-vue-vlyjm.netlify.app/ are informed of the identity of
        the various stakeholders in the framework of its implementation and
        monitoring:<br />
        Owner :
        <a href="https://github.com/VichithLy/pokedex-vue-tailwindcss"
          >Vichith LY and Julien MILLOT</a
        ><br />
        Host : Netlify <br />
        610 22nd Street Suite 315 <br />San Francisco CA 94107 <br />
        United States
      </p>
      <p class="text-3xl py-8 ml-3">
        <span class="text-indigo-600">2</span>. General conditions of use of the
        site and the services offered.
      </p>
      <p>
        The Site constitutes an intellectual work protected by the provisions of
        the Intellectual Property Code and applicable International Regulations.
        The User may not in any way reuse, transfer or exploit for his own
        account all or part of the elements or works of the Site.<br />
        Use of the site implies full acceptance of the general conditions of use
        described below. These conditions of use may be modified or supplemented
        at any time, users of the site are therefore invited to consult them on
        a regular basis. This website is normally accessible to users at any
        time. An interruption due to technical maintenance may however be
        decided by the publication director, who will then endeavor to
        communicate to users before the dates and times of the intervention.<br />
        The site is updated regularly. In the same way, the legal notices can be
        modified at any time: they nevertheless impose themselves on the user
        who is invited to refer to them as often as possible in order to become
        acquainted with them.
      </p>
      <p class="text-3xl py-8 ml-3">
        <span class="text-indigo-600">3</span>. Description of services
        provided.
      </p>
      <p>
        The purpose of the website is to provide infomation of pokémons and
        materialize a Pokédex.
      </p>
      <p class="text-3xl py-8 ml-3">
        <span class="text-indigo-600">4</span>. Contractual Limitations on
        Technical Data.
      </p>
      <p>
        The site uses JavaScript technology. The website cannot be held
        responsible for material damage related to the use of the site. In
        addition, the user of the site agrees to access the site using recent
        equipment, not containing viruses and with an updated latest generation
        browser. The site is hosted by a service provider on French territory,
        in accordance with the provisions of the General Data Protection
        Regulations (RGPD: n° 2016-679).<br />
        The objective is to provide a service that ensures the best
        accessibility rate. The host ensures the continuity of its service 24
        hours a day, every day of the year. It nevertheless reserves the right
        to interrupt the hosting service for the shortest possible durations, in
        particular for the purposes of maintenance, improvement of its
        infrastructures, failure of its infrastructures or if the Services and
        Services generate traffic deemed unnatural. <br />
        The site and the host cannot be held responsible in the event of
        malfunction of the Internet network, telephone lines or computer and
        telephony equipment linked in particular to network congestion
        preventing access to the server.
      </p>
      <p class="text-3xl py-8 ml-3">
        <span class="text-indigo-600">5</span>. Intellectual Property and
        Infringements.
      </p>
      <p>
        Pokémon is Copyright Gamefreak, Nintendo and The Pokémon Company
        2001-2022. All images and names owned and trademarked by Gamefreak,
        Nintendo, The Pokémon Company, and Niantic are property of their
        respective owners.
      </p>
      <p class="text-3xl py-8 ml-3">
        <span class="text-indigo-600">6</span>. Limitation of Liability.
      </p>
      <p>
        All of the information on this website was provided by
        <a href="https://pokeapi.co/">PokéApi</a> so the owners of the Website
        <a href="https://github.com/VichithLy/pokedex-vue-tailwindcss"
          >Vichith LY and Julien MILLOT
        </a>
        do not guarantee the veracity of the information.
      </p>
      <p class="text-3xl py-8 ml-3">
        <span class="text-indigo-600">7</span>. Governing Law and Jurisdiction.
      </p>
      <p>
        Any dispute in connection with the use of the site is subject to French
        law. Apart from cases where the law does not allow it, exclusive
        jurisdiction is given to the competent courts of Nanterre.
      </p>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "../components/TheFooter.vue";
import BaseLogo from "../components/Base/BaseLogo.vue";
import { smoothScrollTo } from "../utils";

export default {
  name: "LegalMentions",
  components: {
    TheFooter,
    BaseLogo,
  },
  mounted() {
    smoothScrollTo("legal-mentions");
  },
  methods: {
    smoothScrollTo,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap");

* {
  font-family: "Nunito", sans-serif;
}
</style>
