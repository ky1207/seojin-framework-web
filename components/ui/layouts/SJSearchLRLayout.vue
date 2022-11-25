<template>
  <div>
    <div class="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li class="breadcrumb-item active">
            Dashboard
          </li>
        </ol>
      </nav>
    </div><!-- End Page Title -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              검색
            </h5>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <slot name="leftTitle" />  <!--left 타이틀명 -->
            </h5>

            <!-- left -->
            <slot name="left" />
            <!-- End left-->
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <slot name="rightTitle" />  <!--right 타이틀명 -->
            </h5>
            <!-- left -->
            <slot name="right" />
            <!-- End left-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
