<template>
    <div class="box _loading">
        <section >
            <form @submit.prevent="submit">
                <b-field
                        label="Название"
                        horizontal
                >
                    <b-input v-model="title"></b-input>
                </b-field>
                <b-field
                        label="Теги"
                        horizontal
                >
                    <b-taginput
                            :allow-duplicates="true"
                            :before-adding="beforeAdd"
                            :remove-on-keys="[]"
                            icon="label"
                            autocomplete
                            field="name"
                            :allow-new="false"
                            @typing="searchTags"
                            :data="filtered"
                            v-model="tags">
                        <template slot-scope="props">
                            <span>{{props.option.name}} ({{props.option.subscribers_count}} подписчиков)</span>
                        </template>
                        <template slot="empty">
                            Не найдено
                        </template>
                    </b-taginput>
                </b-field>
                <b-field label="Описание" horizontal>
                    <b-input v-model="description" maxlength="140" type="textarea"></b-input>
                </b-field>
                <b-field class="file" label="Файл" horizontal>
                    <div class="file is-danger">
                        <b-upload
                                v-model="file"
                                drag-drop>
                            <div style="padding: .4rem 1.25rem;" class="has-text-centered">
                                <p>
                                    <b-icon
                                            icon="upload"
                                            size="is-large">
                                    </b-icon>
                                </p>
                                <p v-if="file">{{file.name}}</p>
                                <p v-else>Drop your file here or click to upload</p>
                            </div>
                        </b-upload>
                    </div>
                </b-field>
                <b-field horizontal>
                    <div class="buttons">
                        <b-button tag="button" native-type="submit" type="is-primary">Добавить</b-button>
                        <b-button tag="a" @click="close" type="is-link" class="is-light">Закрыть</b-button>
                    </div>
                </b-field>
            </form>
        </section>
        <b-loading :active.sync="fileLoading" :can-cancel="false" :is-full-page="false"/>
    </div>
</template>

<script>
    export default {
        name: "AddPost",
        data() {
            return {
                title: "",
                description: "",
                file: null,
                fileLoading: false,
                tags: [],
                filtered: []
            }
        },
        watch: {},
        methods: {
            submit() {
                if (this.title.length === 0
                    || this.description.length === 0
                    || this.file === null
                    || this.tags.length === 0) {
                    return
                }

                let formData = new FormData()
                formData.append('file', this.file)

                let uuid = this.$uuid()

                this.fileLoading = true

                this.$http.post(`/posts/${uuid}/file`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(resp => {
                    console.log(resp.data.message)

                    this.createPost(uuid)
                })
            },
            createPost(uuid) {

                let _tagNames = []

                for (let i = 0; i < this.tags.length; i++) {
                    _tagNames.push(this.tags[i].name)
                }

                let data = {
                    id: uuid,
                    title: this.title,
                    description: this.description,
                    tag_names: _tagNames
                }

                this.$http.post(`/posts/${uuid}`, data)
                    .then(() => {
                        this.fileLoading = false
                        console.log(`File and post with uuid "${uuid}" was successfully created`)
                        this.close()
                    })

            },
            beforeAdd(tag) {
                for (let i = 0; i < this.tags.length; i++) {
                    if (tag.name === this.tags[i].name) {
                        return false
                    }
                }
                return true
            },
            searchTags(query) {
                if (query === null || query.length === 0) {
                    this.filtered = []
                    return
                }

                this.$http({url: `/tags/search?q=${query}`})
                    .then(resp => {
                        this.filtered = resp.data.tags || []
                        console.log('Retrieved data: ' + resp.data.tags)
                    }).catch()
            },
            close() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="sass" scoped>
.file-name
    max-width: 22em

a
    text-decoration: none
    color: inherit
</style>