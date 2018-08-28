<template>
    <div class="rt-grid">
        <div class="rt-grid__header" v-if="$slots.toolbar">
            <rt-toolbar>
                <slot name="toolbar"></slot>
            </rt-toolbar>
            <el-button type="primary" @click="handleCollapse" v-if="$slots.more" style="float: right;margin-left: 20px;padding: 0 10px;height: 26px;margin-top: 6px;">
                <i :class="iconClass" style="font-size:10px;"></i>
                更多筛选
            </el-button>
            <el-input :placeholder="quicksearchPlaceholder" v-model="quickSearch" style="float:right;width:20%;margin-top: 6px;">
                <el-button slot="append" icon="search" @click="handleQuickSearch"></el-button>
            </el-input>
        </div>
        <div class="rt-grid__moresearch" v-show="$slots.more && showHidden">
            <slot name="more"></slot>
            <el-row :gutter="40" type="flex">
                <el-col v-bind:span="24" style="float:right;text-align:right;">
                    <el-button type="primary" @click="handleReset" class="rt-query__reset">重置</el-button>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="rt-grid__body">
            <slot></slot>
        </div>
        <div class="rt-grid__footer">
            <el-pagination v-if="showPagination" @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "RtGrid",
    data() {
        return {
            quickSearch: null,

            showHidden: false,

            pageIndex: 1,
            pageSize: 20,
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 30, 40, 50]
        }
    },
    props: {
        quicksearchPlaceholder: String,
        showPagination: {
            type: Boolean,
            default: true,
            required: false
        },
        totalRecord: {
            type: Number,
            required: false
        }
    },
    computed: {
        iconClass() {
            return this.showHidden ? "el-icon-arrow-up" : "el-icon-arrow-down";
        }
    },
    methods: {
        handleCollapse() {
            this.showHidden = !this.showHidden;
        },
        handleReset() {
            this.$emit('reset');
        },
        handleSearch() {
            this.pageIndex = 1;
            this.$emit('search');
        },

        handleQuickSearch() {
            this.pageIndex = 1;
            this.$emit('quick-search');
        },

        handleSizeChange(val) {
            this.pageSize = val;
            this.$emit("page-change", this.pageIndex, this.pageSize);
        },
        handleIndexChange(val) {
            this.pageIndex = val;
            this.$emit("page-change", this.pageIndex, this.pageSize);
        },

        getPageIndex() {
            return this.pageIndex;
        },
        getPageSize() {
            return this.pageSize;
        },
        getSearchString() {
            return this.quickSearch;
        },
		setSearchString(quicksearch) {
			this.quickSearch = quicksearch
		}
    }
}
</script>