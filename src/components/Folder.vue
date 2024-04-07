<template>
  <div>
    <input class="variation" id="solid" type="radio" value="1" name="border" checked="checked" />
    <div class="folder">
      <div class="tabs">
        <button class="tab active" @click="openTab($event, 'tab-1')">
          <div><span>Work stuff</span></div>
        </button>
        <button class="tab" @click="openTab($event, 'tab-2')">
          <div><span>Food</span></div>
        </button>
        <button class="tab" @click="openTab($event, 'tab-3')">
          <div><span>Baking</span></div>
        </button>
        <!-- <button class="tab" @click="openTab($event, 'tab-4')">
          <div><span>Cat</span></div>
        </button> -->
      </div>
      <div class="content">
        <div class="content__inner" id="tab-1" style="display: block">
          <div class="page">
            <p>
              Productize. Optics accountable talk. Thought shower. High performance keywords market-facing drink from the firehose, or you better eat a reality
              sandwich before you walk back in that boardroom, but accountable talk knowledge process outsourcing.
            </p>
            <p>
              What's our go to market strategy? cross functional teams enable out of the box brainstorming nor zeitgeist viral engagement. Deep dive. Organic
              growth quick sync, feed the algorithm.
            </p>
          </div>
        </div>
        <div class="content__inner" id="tab-2" style="display: none">
          <div class="page">
            <p>
              I love cheese, especially the big cheese gouda. Monterey jack red leicester roquefort cheese and wine fromage frais smelly cheese melted cheese
              dolcelatte. Fromage smelly cheese manchego paneer cheese and wine danish fontina macaroni cheese red leicester.
            </p>
            <p>
              Stilton fondue queso emmental when the cheese comes out everybody's happy croque monsieur queso paneer. Say cheese pecorino swiss boursin halloumi
              cottage cheese taleggio boursin.
            </p>
          </div>
        </div>
        <div class="content__inner" id="tab-3" style="display: none">
          <div class="page">
            <p>
              Cupcake ipsum dolor sit amet jujubes tart. Tiramisu icing gingerbread halvah cake. Marzipan cake soufflé cookie brownie ice cream cupcake. Dragée
              croissant bonbon ice cream oat cake jelly cookie. Wafer candy dessert jelly jelly-o.
            </p>
            <p>
              Oat cake donut powder pastry wafer brownie cupcake caramels bear claw. Bonbon caramels oat cake cake shortbread. Cake cheesecake candy icing bear
              claw marshmallow icing jelly. Halvah biscuit pudding danish cookie bonbon gummies.
            </p>
          </div>
        </div>
        <!-- <div class="content__inner" id="tab-4" style="display: none">
          <div class="page">
            <p>
              Miaow then turn around and show you my bum flee in terror at cucumber discovered on floor. Terrorize the hundred-and-twenty-pound rottweiler and
              steal his bed, not sorry sleep on dog bed, force dog to sleep on floor and grab pompom in mouth and put in water dish cats are fats i like to pets
              them they like to meow back present belly, scratch hand when stroked.
            </p>
            <p>Bleghbleghvomit my furball really tie the room together love asdflkjaertvlkjasntvkjn (sits on keyboard) but bawl under human beds.</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    openTab(evt, tab) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName('content__inner');
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
      }
      tablinks = document.getElementsByClassName('tab');
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
      }
      document.getElementById(tab).style.display = 'block';
      evt.currentTarget.className += ' active';
    },
  },
};
</script>
<style lang="less" scoped>
.folder {
  //   grid-column: 1/-1;
  width: 92%;
  margin-left: 4%;
  padding-top: 70px;
}

p {
  margin-bottom: 1rem;
}
.tab {
  width: 18%;
  text-align: center;
  font-family: '腾祥智黑简';
  text-transform: uppercase;
  line-height: 0.8;
  display: inline-block;
  margin-left: -35px;
  filter: drop-shadow(0px -3px 2px rgba(0, 0, 0, 0.05));
  border: none;
  border-radius: 6px 6px 0 0;
  position: relative;
  margin-right: 8%;
  background: var(--background);
  white-space: nowrap;
  cursor: pointer;
  background: var(--background);
  :focus {
    outline: none;
    span {
      border-bottom: 2px solid;
      border-radius: 0;
    }
  }
  div {
    background: var(--background);
    padding: 12px 0;
    position: relative;
    z-index: 10;
  }
  span {
    display: inline-block;
    padding: 5px 0px;
    border-radius: 5px;
    z-index: 5;
    position: relative;
    font-size: 140%;
    color: #fff;
    min-width: 6rem;
  }
}

.tab:first-of-type {
  margin-left: 30px;
}

.tab:before,
.tab:after {
  content: '';
  height: 100%;
  position: absolute;
  background: var(--background);
  border-radius: 8px 8px 0 0;
  width: 30px;
  top: 0;
}

.tab:before {
  right: -16px;
  transform: skew(25deg);
  border-radius: 0 8px 0 0;
}

.tab:after {
  transform: skew(-25deg);
  left: -16px;
  border-radius: 8px 0 0 0;
}

.tab .tab.active span {
  border-radius: 5px;
  color: black;
}

.content {
  border-radius: 10px;
  position: relative;
  width: 100%;
  #tab-1 {
    display: block;
  }
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    border-radius: inherit;
  }

  .content__inner {
    font-family: 'Yomogi', sans-serif;
    display: none;
    background: var(--background);
    border-radius: inherit;
    padding: 1rem;
    // filter: drop-shadow(0px -2px 2px rgba(0, 0, 0, 0.1));
    z-index: 5;
  }
  .page {
    padding: 16px;
    border-radius: 2px;
    // min-height: 20rem;
    line-height: 80px;
    background-color: #f9f9f9;
    // filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.15));
    background-image: linear-gradient(#e4e4e4 1px, transparent 1px);
    background-size: 8% 8%, 2px 2px;
    font-family: '腾祥智黑简';
  }
}

#solid:checked ~ .folder .tab:nth-of-type(1),
#solid:checked ~ .folder .content__inner:nth-of-type(1) {
  --background: #a7a7a7;
}

#solid:checked ~ .folder .tab:nth-of-type(2),
#solid:checked ~ .folder .content__inner:nth-of-type(2) {
  --background: #666;
}

#solid:checked ~ .folder .tab:nth-of-type(3),
#solid:checked ~ .folder .content__inner:nth-of-type(3) {
  --background: #333;
}

#solid:checked ~ .folder .tab:nth-of-type(4),
#solid:checked ~ .folder .content__inner:nth-of-type(4) {
  --background: #6cb6bb;
}
button {
  outline: none !important;
}

#solid:checked ~ .folder .tab {
  //   border: 2px solid;
  //   border-width: 2px 0 0;
  outline: none !important;
}

#solid:checked ~ .folder .tab:before {
  //   border-right: 2px solid;
  box-shadow: 3px 4px 2px 2px #111;
}

#solid:checked ~ .folder .tab:after {
  //   border-left: 2px solid;
  //   box-shadow: 3px 4px 2px 2px #111;
}

#solid:checked ~ .folder .tab.active:focus span {
  outline: none;
}

#solid:checked ~ .folder .tab:not(.active) {
  border-bottom: 2px solid;
}

#solid:checked ~ .folder .tab:not(.active):before,
#solid:checked ~ .folder .tab:not(.active):after {
  //   box-shadow: 0 1.5px 0 black;
}

#solid:checked ~ .folder .content {
  top: -3px;
  left: -2px;
}

#solid:checked ~ .folder .content__inner {
  box-shadow: 3px 4px 2px 2px #111;
}

input.variation {
  display: none;
}
</style>
