FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libzip-dev \
    supervisor \
    nodejs \
    npm \
    wget \
    openssl \
    libonig-dev \
    php-xml \                  # Install ext-xml (xml extension)
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo_mysql mbstring zip exif pcntl

# Install the PHP Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for Laravel application
RUN groupadd -g 1000 www && useradd -u 1000 -ms /bin/bash -g www www

# Set permissions for Laravel directories
RUN mkdir -p /var/www/app && chown -R www:www /var/www/app

# Copy Laravel app files
COPY ./app /var/www/app
COPY ./php/local.ini /usr/local/etc/php/conf.d/local.ini

# Ensure vendor directory exists with proper permissions
RUN mkdir -p /var/www/app/vendor && chown -R www:www /var/www/app/vendor

# Change ownership of the application
RUN chown -R www:www /var/www/app

# Switch to non-root user
USER www

# Run Composer install as the non-root user
RUN composer install --no-dev --optimize-autoloader --working-dir=/var/www/app

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
