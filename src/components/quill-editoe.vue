<template>
    <div>
        <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                >
        </quill-editor>
    </div>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        data(){
            return{
                content:'',
                token:'',
                editorOption:{
                     modules: {
                        ImageExtend: {
                        loading: true,
                        name: 'file',
                        action: 'https://upload-z1.qiniup.com',
                        response: (res) => {
                            return res.url
                        },
                        change: (xhr, formData) => {
                                formData.append('token', this.token)
                             }
                        },
                        toolbar: {
                        container: container,
                        handlers: {
                            'image': function () {
                            QuillWatch.emit(this.quill.id)
                            }
                        }
                        }
                    }
                }
            }
        },
        methods:{
            
            getToken(){
                this.$axios.get('http://upload.yaojunrong.com/getToken').then(res =>{
                    this.token = res.data.data
                })
            }
        },
        created(){
            this.getToken()
            
        }
    }
</script>

<style scoped>

</style>