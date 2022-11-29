<template>
  <div>
    <div class="row pagetitle mt-1">
      <div class="col">
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
      </div>
      <div class="col-auto">
        <slot name="master-btn" />
      </div>
    </div><!-- End Page Title -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <slot name="title" />
        </h5>
        <slot />
      </div>
    </div>
  </div>
</template>
