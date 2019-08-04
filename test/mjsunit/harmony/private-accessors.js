// Copyright 2019 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --harmony-private-methods

"use strict";

// Complementary private accessors.
{
  class C {
    get #a() {  }
    set #a(val) { }
  }

  new C;
}

// Nested private accessors.
{
  class C {
    a() { this.#a; }
    get #a() {
      class D { get #a() { } }
      return new D;
    }
  }
  new C().a();
}

// Duplicate private accessors.
// https://tc39.es/proposal-private-methods/#sec-static-semantics-early-errors
{
  assertThrows('class C { get #a() {} get #a() {} }', SyntaxError);
  assertThrows('class C { set #a(val) {} set #a(val) {} }', SyntaxError);
}
