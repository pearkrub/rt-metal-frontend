<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">ก่อนหน้า</a>
      </li>
      <li class="page-item active">
        <span class="page-link">
          1
          <span class="sr-only">(current)</span>
        </span>
      </li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">ถัดไป</a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "PaginationNav",
};
</script>