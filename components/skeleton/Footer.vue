<template>
<footer>
  <div class="bigger bg-light">

    <b-container >
      <b-row>
        <b-col md="4" lg="3">
          <h4>Kontakt</h4>
          <p>
            sdf
            <br />sdf
            <br />sdf
            <p />
            <p>
              <a href="mailto:#">sdf@sdf.sdf</a><br />
            </p>
        </b-col>

        <b-col md="5" offset-md="1" lg="5" offset-lg="1">
          <h4>Newsletter</h4>

          <form action="#" method="post" id="mc-embedded-subscribe-form" @submit="onSubmit">

            <input v-model="email" type="email" name="EMAIL" class="form-control" placeholder="*Ihre E-Mail" required />

            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display:none"></div>
              <div class="response" id="mce-success-response" style="display:none"></div>
            </div>

            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input type="text" name="#" tabindex="-1" value="">
            </div>

            <input type="submit" value="anmelden" name="subscribe" id="mc-embedded-subscribe" class="btn btn-primary">

          </form>

          <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>

          </form>

        </b-col>

        <b-col md="2" lg="2" offset-lg="1" class="text-right">
          <a href="#" target="_blank" class="social">
            <no-ssr>
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </no-ssr>
          </a>
          <a href="#" target="_blank" class="social">
            <no-ssr>
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </no-ssr>
          </a>
        </b-col>

      </b-row>
    </b-container>

  </div>
  <b-container class="main-container">
    <b-row>

      <b-col cols="4">
        © 2019
      </b-col>

      <b-col cols="8" class="text-right justify-content-end">
        <nuxt-link to="/de/info/impressum" class="legal">Impressum</nuxt-link>
        <nuxt-link to="/de/info/datenschutzerklaerung" class="legal">Datenschutzerklärung</nuxt-link>
      </b-col>

    </b-row>
  </b-container>
</footer>
</template>

<style scoped lang="scss">
@import "~~/assets/scss/_vars.scss";
@import "~bootstrap/scss/mixins";

footer {
    color: $black;
    margin-top: 100px;

    .row > * {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }
    a {
        color: $black;

        &.social {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            font-size: 35px;
            margin-left: 10px;
        }

        &:hover {
            color: $primary;
        }

    }

    .bigger {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }

    #email {
        margin-bottom: 5px;
    }

    #mc-embedded-subscribe {
        margin-top: 1.5em;
    }

    h4 {
        color: $primary;
    }

    .links {
        a {
            display: inline-block;
            margin-left: 2rem;
            &:hover {
                text-decoration: none;
            }
            @include media-breakpoint-down(sm) {
                &:first-of-type {
                    margin-left: 0;
                }
            }
        }
    }
}

.legal {
    margin-left: 2em;
}

form {
    position: relative;
}

.response {
    font-family: $font;
    font-size: 15px;
    line-height: 32px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    &#mce-error-response {
        color: #f00;
    }

    &#mce-success-response {
        position: absolute;
        background: grey;
        color: $black;
        height: 100%;
        top: 0;
    }

}

@media (max-width: map-get($grid-breakpoints, md)) {
    .row {
        padding-top: 0;
    }

    footer .bigger {
        padding-bottom: 1rem;
    }

    .text-right {
        text-align: left!important;
    }
}
</style>

<script>
// https://stackoverflow.com/a/46181/3137109
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export default {
  name: "AppFooter",

  data() {
    return {
      "email": ""
    }
  },

  methods: {
    onSubmit(e) {
      let ele = document.getElementById('mce-error-response')
      if (!validateEmail(this.email)) {
        ele.innerText = 'Bitte geben Sie eine gültige E-Mail Adresse an.'
        ele.style.display = 'block'
      } else {
        ele.innerText = ele.style.display = ''
      }

    }
  }

}
</script>
