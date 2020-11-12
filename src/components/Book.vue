<template>
    <div class="col-md-6 col-lg-4">
        <div class="card p-3 my-3">
            <div class="row no-gutters">
                <div class="col-8">
                    <div class="card-body d-flex flex-column justify-content-between h-100">
                        <h5 class="card-title text-center">{{element.title}}</h5>
                        <router-link :to="{ name: 'BookDetails', params: { bookId: element.id } }" class="btn btn-light">See more</router-link>
                    </div>
                </div>
                <div class="col-4">
                    <img src="https://edit.org/img/blog/xppe-crear-portadas-de-libros-online.jpg.pagespeed.ic.4gxfEa_h1k.jpg" class="card-img" alt="asd">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Book',
        props: {
            element: Object
        },
        computed: {
            formatDescription(){
                const arrayDesc = this.element.description.split('');
                const newDescArray = arrayDesc.splice(0,80);
                return newDescArray.join('')+'...';
            }
        }
    }
</script>

<style>
    .cover-page {
        width: 100%;
        border-radius: 5px;
        position: relative;
        bottom: 10%;
    }
    .btn-light{
        background-color: rgb(184, 184, 184);
    }
</style>