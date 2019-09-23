# `lit-view`

## `rendering template`

####   `should render found template`

```html
<span>
  test
</span>

```

####   `should render pass scope to template`

```html
<span>
  scope test
</span>

```

## `rendering nested templates`

####   `should use render parameter`

```html
<p class="l1">
</p>
<p class="l2">
</p>
<p class="l3">
  <span>
    I'm deep
  </span>
</p>
<p>
</p>
<p>
</p>

```

####   `should select template for selected value`

```html

```

####   `should allow changing scope`

```html
nested

```

####   `should provide an empty params object fallback`

```html
<p>
  <span>
    {}
  </span>
</p>

```

## `when value is set before inserting to DOM`

####   `should render correctly`

```html
<p>
  <span>
    {}
  </span>
</p>

```

## `when passing params values`

####   `makes it accessible to child render when used together with scope`

```html
a 
        
              'bar' A

```

####   `makes it accessible to child render when used without scope`

```html
a 
        
              'foo' A

```

