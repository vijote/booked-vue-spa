<template>
    <div>
        <div v-if='source && pageCount' class="d-flex justify-content-between reader align-items-center">
            <button @click='goToPreviousPage' class="btn-reader previous-page">Previous</button>
            {{currentPage}} / {{ pageCount }}
            <button @click='goToNextPage' class="btn-reader next-page">Next</button>
        </div>
        <div v-else>
            <h2>Loading your book...</h2>
        </div>
        <pdf
            :page='currentPage'
            :src="source"
            @num-pages="pageCount = $event;"/>
    </div>
</template>

<script>
    import pdf from 'vue-pdf';
    
    export default {
        name: 'PDFReader',
        data(){
            return {
                currentPage: 1,
                pageCount: 0,
            }
        },
        props: {
            source: String
        },
        components: {
            pdf
        },
         methods: {
            goToNextPage(){
                if(this.currentPage < this.pageCount){
                    this.currentPage++;
                }
            },
            goToPreviousPage(){
                if(this.currentPage > 1){
                    this.currentPage--;
                }
            }
        },
    }
</script>

<style>
    .reader{
        background-color:  #FCFCFC;
        border-radius: 5px;
    }
    .btn-reader{
        border: none;
        outline: none;
        padding: 10px 20px;
    }
    .previous-page{
        border-radius: 5px 0 0 0;
    }
    .next-page{
        border-radius:  5px 0 0;
    }
</style>