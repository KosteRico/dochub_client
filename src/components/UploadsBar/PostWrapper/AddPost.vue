<template>
    <div class="box _loading">
        <section>
            <form @submit.prevent="createPost">
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
    import closeModal from "@/mixins/closeModal";
    import searchTags from "@/mixins/searchTags";

    export default {
        name: "AddPost",
        data() {
            return {
                title: "",
                description: "",
                file: null,
                fileLoading: false,
            }
        },
        mixins: [closeModal, searchTags],
        methods: {
            loadFile(uuid) {

                let formData = new FormData()
                formData.append('file', this.file)

                this.$http.post(`/posts/${uuid}/file`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(resp => {
                    console.log(resp.data.message)
                    this.close()
                }).catch(err => {
                    this.loading = false
                    this.$toast({
                        message: err.response.data.message,
                        type: 'is-danger'
                    })
                })
            },
            createPost() {
                if (this.title.length === 0
                    || this.description.length === 0
                    || this.file === null
                    || this.tags.length === 0) {
                    return
                }

                this.fileLoading = true

                let uuid = this.$uuid()

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
                        this.loadFile(uuid)
                    })
                    .catch(err => {
                        this.fileLoading = false
                        this.$toast({
                            message: err.response.data.message,
                            type: 'is-danger'
                        })
                    })

            },
            beforeAdd(tag) {
                for (let i = 0; i < this.tags.length; i++) {
                    if (tag.name === this.tags[i].name) {
                        return false
                    }
                }
                return true
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