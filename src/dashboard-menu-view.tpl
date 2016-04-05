<div class="CDB-Dashboard-menuContainer">
  <div class="CDB-Dashboard-menuInner">
    <div class="CDB-Dashboard-menuHeader">
      <div class="CDB-Dashboard-menuLogo">
        <i class="CDB-IconFont CDB-IconFont-cartoFante"></i>
      </div>
      <div class="CDB-Dashboard-menuInfo">
        <button class="CDB-Shape CDB-Shape--medium js-toggle-view">
          <div class="CDB-Shape-threePoints is-horizontal is-medium is-white">
            <div class="CDB-Shape-threePointsItem is-round"></div>
            <div class="CDB-Shape-threePointsItem is-round"></div>
            <div class="CDB-Shape-threePointsItem is-round"></div>
          </div>
        </button>
      </div>
      <div class="CDB-Dashboard-menuInfo is-active">
        <button class="CDB-Shape CDB-Shape--medium js-toggle-view">
          <div class="CDB-Shape-threePoints is-horizontal is-medium">
            <div class="CDB-Shape-threePointsItem is-round"></div>
            <div class="CDB-Shape-threePointsItem is-round"></div>
            <div class="CDB-Shape-threePointsItem is-round"></div>
          </div>
        </button>
      </div>

      <div class="CDB-Dashboard-menuTexts CDB-Dashboard-hideMobile">
        <p class="CDB-Text CDB-Size-small is-semibold u-upperCase u-mainTextColor u-bSpace--xl js-timeAgo">UPDATED <%- updatedAt %></p>
        <h1 class="CDB-Dashboard-menuTitle CDB-Text CDB-Size-huge u-ellipsis u-bSpace--xl js-title"><%- title %></h1>
        <h2 class="CDB-Text CDB-Size-large u-secondaryTextColor js-description"><%= cdb.core.sanitize.html(description) %></h2>
        <ul class="CDB-Dashboard-menuActions">
          <li class="CDB-Dashboard-menuActionsItem">
            <a href="#" class="u-hintTextColor">
              <i class="CDB-IconFont CDB-IconFont-heartFill CDB-Size-large"></i>
            </a>
          </li>
          <li class="CDB-Dashboard-menuActionsItem">
            <a href="#" class="u-hintTextColor">
              <i class="CDB-IconFont CDB-IconFont-twitter CDB-Size-large"></i>
            </a>
          </li>
          <li class="CDB-Dashboard-menuActionsItem">
            <a href="#" class="u-hintTextColor">
              <i class="CDB-IconFont CDB-IconFont-facebook CDB-Size-medium"></i>
            </a>
          </li>
          <li class="CDB-Dashboard-menuActionsItem">
            <a href="#" class="u-hintTextColor">
              <i class="CDB-IconFont CDB-IconFont-anchor CDB-Size-medium"></i>
            </a>
          </li>
        </ul>
        <ul class="CDB-SnapShoots">
          <li class="CDB-SnapShoots-item">
            <div class="CDB-SnapShoots-inner">
              <div class="CDB-SnapShoots-radio">
                <input class="CDB-Radio" type="radio" name="snapshoot" value="01" checked>
                <span class="u-iBlock CDB-Radio-face"></span>
              </div>
              <div class="CDB-SnapShoots-text">
                <p class="CDB-Text is-semibold CDB-Size-small">PRESENT</p>
              </div>
            </div>
            <div class="CDB-SnapShoots-infoInner">
              <div class="CDB-SnapShoots-infoContainer">
                <p class="CDB-SnapShoots-infoText CDB-Text CDB-Size-small u-altTextColor">This allows you to save the map states and configuration</p>
                <button class="CDB-Button CDB-Button--primary CDB-Button--small">
                  <span class="CDB-Button-Text CDB-Text is-semibold CDB-Size-small">SAVE SNAPSHOT</span>
                </button>
              </div>
            </div>
          </li>

          <li class="CDB-SnapShoots-item">
            <div class="CDB-SnapShoots-inner">
              <div class="CDB-SnapShoots-radio">
                <input class="CDB-Radio" type="radio" name="snapshoot" value="01" checked>
                <span class="u-iBlock CDB-Radio-face"></span>
              </div>
              <div class="CDB-SnapShoots-text">
                <p class="CDB-Text is-semibold CDB-Size-small">28 FEB 2015, 23:51</p>
                <input type="text" name="text" placeholder="DejaVu Sans" class="CDB-InputText CDB-Text CDB-SnapShoots-input">
                <button class="CDB-Shape CDB-SnapShoots-action">
                  <div class="CDB-Shape-threePoints is-blue is-small">
                    <div class="CDB-Shape-threePointsItem"></div>
                    <div class="CDB-Shape-threePointsItem"></div>
                    <div class="CDB-Shape-threePointsItem"></div>
                  </div>
                </button>
              </div>
            </div>
          </li>
          <li class="CDB-SnapShoots-item">
            <div class="CDB-SnapShoots-inner">
              <div class="CDB-SnapShoots-radio">
                <input class="CDB-Radio" type="radio" name="snapshoot" value="01" checked>
                <span class="u-iBlock CDB-Radio-face"></span>
              </div>
              <div class="CDB-SnapShoots-text">
                <p class="CDB-Text is-semibold CDB-Size-small">28 FEB 2015, 23:51</p>
                <input type="text" name="text" placeholder="DejaVu Sans" class="CDB-InputText CDB-Text CDB-SnapShoots-input">
                <button class="CDB-Shape CDB-SnapShoots-action">
                  <div class="CDB-Shape-threePoints is-blue is-small">
                    <div class="CDB-Shape-threePointsItem"></div>
                    <div class="CDB-Shape-threePointsItem"></div>
                    <div class="CDB-Shape-threePointsItem"></div>
                  </div>
                </button>
              </div>
            </div>
          </li>
          <li class="CDB-SnapShoots-item">
            <div class="CDB-SnapShoots-inner">
              <div class="CDB-SnapShoots-radio">
                <input class="CDB-Radio" type="radio" name="snapshoot" value="01" checked>
                <span class="u-iBlock CDB-Radio-face"></span>
              </div>
              <div class="CDB-SnapShoots-text">
                <p class="CDB-Text is-semibold CDB-Size-small">28 FEB 2015, 23:51</p>
                <input type="text" name="text" placeholder="DejaVu Sans" class="CDB-InputText CDB-Text CDB-SnapShoots-input">
                <button class="CDB-Shape CDB-SnapShoots-action">
                  <div class="CDB-Shape-threePoints is-blue is-small">
                    <div class="CDB-Shape-threePointsItem"></div>
                    <div class="CDB-Shape-threePointsItem"></div>
                    <div class="CDB-Shape-threePointsItem"></div>
                  </div>
                </button>
              </div>
            </div>
          </li>
        </ul>


      </div>
    </div>

    <div class="CDB-Dashboard-menuFooter">
      <ul>
        <li class="CDB-Dashboard-menuFooterItem ">
          <div class="CDB-Dashboard-menuMedia CDB-Dashboard-menuAvatar">
            <img src="<%- userAvatarURL %>" alt="avatar" class="inline-block"/>
          </div>
          <p class="CDB-Text CDB-Size-medium CDB-Dashboard-menuFooterTxt"><%- userName %></p>
        </li>
      </ul>
    </div>
  </div>
  <div class="CDB-Dashboard-bg js-toggle-view"></div>

  <div class="CDB-Dashboard-menuHeaderMobile u-showMobile">
    <div class="CDB-Dashboard-menuLogo">
      <i class="CDB-IconFont CDB-IconFont-cartoFante"></i>
    </div>
    <button class="js-toggle-view">
      <span class="CDB-Shape CDB-Shape--hamburguer"></span>
    </button>
    <div class="CDB-Dashboard-menuMedia CDB-Dashboard-menuAvatar">
      <img src="<%- userAvatarURL %>" alt="avatar" class="inline-block"/>
    </div>
  </div>
</div>
