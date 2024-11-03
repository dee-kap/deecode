---
title: Format code before saving in vim with Prettier
date: 2023-08-30
category: 'Tech'
tags: ['VIM']
featured_image: 
summary: 
permalink: "/blog/2023/8/30/format-code-in-vim-using-prettier/"
---

To format code before saving a buffer in Vim/Neovim, we can use some excellent plugins out there. But I prefer to do things without plugins wherever possible.

Adding the code below to config will automatically format files of type `*.ts,*.js,*.jsx,*.tsx,*.css` before saving.

Here I am using [Prettier](https://prettier.io/), so Prettier has to be installed for this to work.

```lua
function format_and_restore_cursor()
  local cursor_pos = vim.fn.getcurpos()
  vim.cmd("silent! %!prettier --stdin-filepath % --single-quote")
  vim.fn.setpos('.', cursor_pos)
end

function setup_external_formatter_autocmd()
  vim.api.nvim_exec([[
    augroup FormatterAutogroup
      autocmd!
      autocmd BufWritePre *.ts,*.js,*.jsx,*.tsx,*.css lua format_and_restore_cursor()
    augroup END
  ]], false)
end

setup_external_formatter_autocmd()

```
