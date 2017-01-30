    <md-toolbar class="md-large" v-md-theme="'green'">
    <div class="md-toolbar-container">
      <md-button class="md-icon-button">
        <icon name="material-menu"></icon>
      </md-button>

      <span style="flex: 1;"></span>

      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>

      <md-button class="md-icon-button">
        <md-icon>filter_list</md-icon>
      </md-button>
    </div>

    <div class="md-toolbar-container">
      <h2 class="md-title">Vue Material</h2>

      <md-button class="md-fab md-fab-bottom-right">
        <icon name="material-add"></icon>
      </md-button>
    </div>
    </md-toolbar>

    <md-input-container :class="{ 'md-input-invalid': hasError('post.file') }">
      <span class="up-span md-raised md-primary"> 
         选择文件 
				<input class="up-btn" @change="onFileChange" type="file"></input>
      </span>
      <span v-show="hasError('post.file')" class="md-error">{{errorOne('post.file')}}</span>
		</md-input-container>

